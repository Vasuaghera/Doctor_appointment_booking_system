import express from 'express';
import { sendWelcomeEmail, sendLoginNotification, sendVerificationEmail } from '../controllers/emailController.js';

const router = express.Router();

// Route to send welcome email
router.post('/welcome', async (req, res) => {
    const result = await sendWelcomeEmail(req.body);
    res.json(result);
});

// Route to send login notification
router.post('/login-notification', async (req, res) => {
    const result = await sendLoginNotification(req.body);
    res.json(result);
});

// Route to send verification email
router.post('/verification', async (req, res) => {
    const result = await sendVerificationEmail(req.body);
    res.json(result);
});

export default router; 