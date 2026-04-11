# Nilesh Sharma - Professional Portfolio

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=react)
![Deployment](https://img.shields.io/badge/Deployed-Vercel%20%7C%20Render-success?style=for-the-badge)

A complete, full-stack Personal Portfolio designed and developed from scratch using the MERN Stack. This application acts as a "living CV" that showcases my skills in Cybersecurity, Cloud Engineering, and full-stack development. 

## 🌐 Live Deployment Links
- **Frontend (Live Site):** [https://portfolio-4ltz.vercel.app](https://portfolio-4ltz.vercel.app)

## ✨ Project Highlights & Features
- **Frontend (React + Vite):** A highly interactive UI built with React, featuring smooth animations powered by *Framer Motion*, a responsive dark layout, and a dynamic hero section with a typewriter effect.
- **Backend (Express + Node.js):** A robust REST API equipped with security features like CORS validation and rate-limiting (`express-rate-limit`).
- **Database (MongoDB):** Securely stores all incoming contact form messages using Mongoose schemas with built-in validation.
- **Email Notifications (Nodemailer):** Asynchronously sends a beautifully formatted HTML email direct to my inbox whenever the contact form is submitted.
- **Dynamic File Serving:** Securely handles serving PDF and DOCX versions of my professional CV over an Express backend route.

## 🛠 Tech Stack
- **Frontend:** React, Vite, Framer Motion, CSS3 (Vanilla)
- **Backend:** Node.js, Express.js, Nodemailer
- **Database:** MongoDB Atlas, Mongoose
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## 💻 Local Setup Steps

Follow these instructions to run the full-stack project locally on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/NileshSharma71/Portfolio.git
cd Portfolio
```

### 2. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```
2. Create a `.env` file in the `backend` folder and add the following required variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string/portfolio
   CORS_ORIGIN=http://localhost:5173
   
   # For Nodemailer
   EMAIL_USER=your_gmail_address
   EMAIL_PASS=your_gmail_app_password
   EMAIL_TO=recipient_email_address
   ```
3. Start the backend development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a *second* terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```
2. Create a `.env` file in the `frontend` folder to point it to your local backend:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

### 4. View the App
Open your browser and navigate to `http://localhost:5173`. The frontend will automatically route API requests to your local backend on port 5000!

---
*Created for the MERN Stack Course Assignment.*
