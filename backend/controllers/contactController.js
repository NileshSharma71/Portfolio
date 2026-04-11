import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

// ─── Build transporter lazily ──────────────────────────────────────────────────
// Called once per server lifecycle (not per request) but AFTER env vars are
// confirmed loaded.  Defined as a function so it reads process.env at call
// time, guaranteeing dotenv has already run.

function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Must be a Gmail App Password — NOT your login password
    },
  });
}

// ─── POST /api/contact ─────────────────────────────────────────────────────────
// Receives contact form → saves to MongoDB → sends email notification.
//
// ASYNC I/O DEMONSTRATION (two non-blocking operations in sequence):
//   1. await contact.save()             → async MongoDB write via Mongoose
//   2. await transporter.sendMail(...)  → async SMTP network call
//
// MongoDB save happens FIRST — so data is always persisted even if email fails.

export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // ── Validation ───────────────────────────────────────────────────────────
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, message) are required.',
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // ── ASYNC I/O #1: Save to MongoDB ─────────────────────────────────────────
    // This always runs first — data is persisted regardless of email status
    const contact = new Contact({ name: name.trim(), email: email.trim(), message: message.trim() });
    await contact.save();

    // ── ASYNC I/O #2: Send email via Gmail SMTP ───────────────────────────────
    // Wrapped in its own try/catch — if email fails, we still return success
    // since the message is already safely stored in MongoDB.
    try {
      const transporter = getTransporter();
      await transporter.sendMail({
        from:    `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to:      process.env.EMAIL_TO || process.env.EMAIL_USER,
        replyTo: email.trim(),
        subject: `[Portfolio] New message from ${name.trim()}`,
        html: `
          <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; color: #0F172A;">
            <div style="background: #0891B2; padding: 24px 32px; border-radius: 12px 12px 0 0;">
              <h2 style="color: #fff; margin: 0; font-size: 20px;">&lt;NS/&gt; — New Portfolio Message</h2>
            </div>
            <div style="background: #F8FAFC; padding: 32px; border: 1px solid #E2E8F0; border-top: none; border-radius: 0 0 12px 12px;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E2E8F0; color: #64748B; width: 80px; font-size: 13px; font-weight: 600; text-transform: uppercase;">Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E2E8F0; color: #0F172A; font-size: 15px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E2E8F0; color: #64748B; font-size: 13px; font-weight: 600; text-transform: uppercase;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #E2E8F0;">
                    <a href="mailto:${email}" style="color: #0891B2; text-decoration: none; font-size: 15px;">${email}</a>
                  </td>
                </tr>
              </table>
              <p style="color: #64748B; font-size: 13px; font-weight: 600; text-transform: uppercase; margin: 0 0 10px 0;">Message</p>
              <div style="background: #fff; border-left: 3px solid #0891B2; padding: 16px 20px; border-radius: 0 8px 8px 0; color: #334155; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</div>
              <p style="color: #94A3B8; font-size: 12px; margin-top: 32px; text-align: center;">
                Sent from your portfolio contact form · Hit Reply to respond directly to ${name}
              </p>
            </div>
          </div>
        `,
      });
      console.log(`📧 Email sent to ${process.env.EMAIL_TO} for message from ${name}`);
    } catch (emailErr) {
      // Email failed but data is already saved — log the error, don't fail the request
      console.error('Email send failed (data saved to MongoDB):', emailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: "Message sent! I'll get back to you within 24 hours. 🙌",
    });

  } catch (err) {
    // Mongoose schema validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(' ') });
    }

    console.error('Contact form error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to save your message. Please try again.',
    });
  }
};
