// ⚠️ MUST be first: In ES Modules, all `import` statements are hoisted and
// evaluated before any code runs. dotenv.config() as a function call would
// always run *after* all imports. Using `import 'dotenv/config'` as a
// side-effect import is the correct ESM pattern — it executes in import order.
import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import contactRoutes from './routes/contact.js';

const app = express();

// Trust the reverse proxy (Render) so rate limiting works correctly
app.set('trust proxy', 1);

const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json({ limit: '10kb' })); // Limit body size for security

// ─── Database Connection (Async I/O) ──────────────────────────────────────────
// mongoose.connect() is a non-blocking async operation.
// We await it before starting the server to ensure DB is ready.

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit if DB connection fails — server is unusable without it
  }
};

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use('/api/contact', contactRoutes);      // POST /api/contact

// Health check endpoint — used by Render/Railway to confirm server is live
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 404 handler — catches any undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
