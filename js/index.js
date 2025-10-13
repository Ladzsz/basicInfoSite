import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const app = express();
const PORT = 8080;

// Fix for ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../'))); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS 
  }
});

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/about.html'));
});

app.get('/contact-me', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/contact-me.html'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../html/404.html'));
});

// email form POST
app.post('/contact-me', async (req, res) => {

  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,  
      to: process.env.GMAIL_USER,    
      subject: `New contact from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      replyTo: email
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ success: false, error: 'Email failed to send' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}/`);
});
