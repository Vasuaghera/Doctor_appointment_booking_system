export const welcomeTemplate = (userData) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
            .button { background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to HealthCare!</h1>
            </div>
            <div class="content">
                <h2>Hello ${userData.name},</h2>
                <p>Thank you for joining our healthcare platform. We're excited to have you on board!</p>
                <p>With your account, you can:</p>
                <ul>
                    <li>Book appointments with top doctors</li>
                    <li>Manage your medical records</li>
                    <li>Receive appointment reminders</li>
                    <li>Access your medical history</li>
                </ul>
                <p style="text-align: center; margin: 30px 0;">
                    <a href="https://doctor-appointment-booking-system-jade.vercel.app/login" class="button">Get Started</a>
                </p>
                <p>If you have any questions, feel free to contact our support team.</p>
            </div>
            <div class="footer">
                <p>This is an automated message, please do not reply.</p>
                <p>&copy; 2024 Hopsital. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export const loginNotificationTemplate = (userData) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
            .alert { background: #fee2e2; border: 1px solid #ef4444; padding: 15px; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>New Login Alert</h1>
            </div>
            <div class="content">
                <h2>Hello ${userData.name},</h2>
                <p>We noticed a new login to your HealthCare account.</p>
                <div class="alert">
                    <p><strong>Login Details:</strong></p>
                    <p>Time: ${new Date().toLocaleString()}</p>
                    <p>Email: ${userData.email}</p>
                </div>
                <p>If this was you, you can ignore this email. If you didn't log in, please secure your account immediately.</p>
                <p>For security, we recommend:</p>
                <ul>
                    <li>Changing your password</li>
                    <li>Enabling two-factor authentication</li>
                    <li>Reviewing your recent account activity</li>
                </ul>
            </div>
            <div class="footer">
                <p>This is an automated message, please do not reply.</p>
                <p>&copy; 2024 Hopsital. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export const verificationTemplate = (userData) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
            .button { background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Verify Your Email</h1>
            </div>
            <div class="content">
                <h2>Hello ${userData.name},</h2>
                <p>Thank you for registering with HealthCare. Please verify your email address to complete your registration.</p>
                <p style="text-align: center; margin: 30px 0;">
                    <a href="https://doctor-appointment-booking-system-jade.vercel.app/verify?token=${userData.verificationToken}" class="button">Verify Email</a>
                </p>
                <p>This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.</p>
            </div>
            <div class="footer">
                <p>This is an automated message, please do not reply.</p>
                <p>&copy; 2024 Hopsital. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}; 
