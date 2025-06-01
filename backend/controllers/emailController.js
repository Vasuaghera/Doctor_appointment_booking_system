import nodemailer from 'nodemailer';
import { welcomeTemplate, loginNotificationTemplate, verificationTemplate } from '../utils/emailTemplates.js';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Verify transporter configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log('SMTP Configuration Error:', error);
    } else {
        console.log('SMTP Server is ready to take our messages');
    }
});

// Send welcome email
export const sendWelcomeEmail = async (userData) => {
    try {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            throw new Error('Email credentials not configured');
        }

        const mailOptions = {
            from: `"HealthCare" <${process.env.SMTP_USER}>`,
            to: userData.email,
            subject: 'Welcome to HealthCare!',
            html: welcomeTemplate(userData)
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Welcome email sent:', info.messageId);
        return { success: true, message: 'Welcome email sent successfully' };
    } catch (error) {
        console.error('Error sending welcome email:', error);
        return { success: false, message: 'Failed to send welcome email' };
    }
};

// Send login notification
export const sendLoginNotification = async (userData) => {
    try {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            throw new Error('Email credentials not configured');
        }

        const mailOptions = {
            from: `"HealthCare" <${process.env.SMTP_USER}>`,
            to: userData.email,
            subject: 'New Login Alert - HealthCare',
            html: loginNotificationTemplate(userData)
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Login notification sent:', info.messageId);
        return { success: true, message: 'Login notification sent successfully' };
    } catch (error) {
        console.error('Error sending login notification:', error);
        return { success: false, message: 'Failed to send login notification' };
    }
};

// Send verification email
export const sendVerificationEmail = async (userData) => {
    try {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            throw new Error('Email credentials not configured');
        }

        const mailOptions = {
            from: `"HealthCare" <${process.env.SMTP_USER}>`,
            to: userData.email,
            subject: 'Verify Your Email - HealthCare',
            html: verificationTemplate(userData)
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Verification email sent:', info.messageId);
        return { success: true, message: 'Verification email sent successfully' };
    } catch (error) {
        console.error('Error sending verification email:', error);
        return { success: false, message: 'Failed to send verification email' };
    }
}; 