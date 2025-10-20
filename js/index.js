import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
//import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 8080;

// Fix for ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
// app.use(cors({
//   origin: allowedOrigin,
//   methods: ['GET','POST'],
//   allowedHeaders: ['Content-Type']
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../'))); 

// const transporter = nodemailer.createTransport({
//   service: 'SendGrid',
//   auth: {
//     user: 'apikey', 
//     pass: process.env.SENDGRID_API_KEY
//   }
// });

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/about.html'));
});

app.get('/contact-me', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/contact-me.html'));
});

// // email form POST
// app.post('/contact-me', async (req, res) => {

//   const { name, email, message } = req.body;

//   try {
//     await transporter.sendMail({
//       from: 'noreply@basicinfosite.com',
//       to: process.env.GMAIL_USER,
//       subject: `New contact from ${name}`,
//       text: `From: ${name} <${email}>\n\n${message}`,
//       replyTo: email
//     });

//     res.json({ success: true });
//   } catch (err) {
//     console.error('Error sending email:', err);
//     res.status(500).json({ success: false, error: 'Email failed to send' });
//   }
// });

// 404 catch-all route
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../404.html'));
});


// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}/`);
});
