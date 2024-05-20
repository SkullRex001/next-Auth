import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: "Confirm your email",
            html: ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dddddd; border-radius: 10px;">
            <h1 style="color: #333333; text-align: center;">Welcome!</h1>
            <p style="color: #555555; font-size: 16px;">Hi,</p>
            <p style="color: #555555; font-size: 16px;">
                Thank you for signing up. To complete your registration, please confirm your email address by clicking the button below.
            </p>
            <div style="text-align: center; margin: 20px 0;">
                <a href="${confirmLink}" style="background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Confirm Email</a>
            </div>
            <p style="color: #555555; font-size: 16px;">
                If you did not sign up for this account, please ignore this email.
            </p>
            <p style="color: #555555; font-size: 16px;">
                Best regards,<br>
                AVS 😎
            </p>
        </div>`
        })

    }

    catch (error) {
        console.log(error)
    }

}

export const sendResetPasswordEmail = async (email: string, token: string) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: "Reset Your Password",
            html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dddddd; border-radius: 10px;">
            <h1 style="color: #333333; text-align: center;">Reset Your Password</h1>
            <p style="color: #555555; font-size: 16px;">Hi,</p>
            <p style="color: #555555; font-size: 16px;">
                We received a request to reset the password for your account. Click the button below to reset your password.
            </p>
            <div style="text-align: center; margin: 20px 0;">
                <a href="${resetLink}" style="background-color: #ff4b5c; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Reset Password</a>
            </div>
            <p style="color: #555555; font-size: 16px;">
                If you did not request a password reset, please ignore this email. Your password will remain unchanged.
            </p>
            <p style="color: #555555; font-size: 16px;">
                Best regards,<br>
                AVS 😎
            </p>
        </div>`
        })

    }

    catch (error) {
        console.log(error)
    }

}


export const sendTwoFactorTokenEmail = async (email: string, token: string) => {

    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: "Your Two-Factor Authentication Code",
            html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dddddd; border-radius: 10px;">
            <h1 style="color: #333333; text-align: center;">Two-Factor Authentication Enabled</h1>
            <p style="color: #555555; font-size: 16px;">Hi,</p>
            <p style="color: #555555; font-size: 16px;">
                You have successfully enabled Two-Factor Authentication (2FA) for your account. This additional security measure helps protect your account by requiring a unique verification code in addition to your password when logging in.
            </p>
            <p style="color: #555555; font-size: 16px;">
                To complete your login, please enter the following verification code:
            </p>
            <div style="text-align: center; margin: 20px 0;">
                <span style="background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 24px; display: inline-block;">${token}</span>
            </div>
            <p style="color: #555555; font-size: 16px;">
            <strong style="color: #ff4b5c;">Note:</strong> This token is only valid for <strong>5 minutes</strong>.
        </p>
            <p style="color: #555555; font-size: 16px;">
                If you did not enable this feature or you believe an unauthorized person has accessed your account, please contact our support team immediately.
            </p>
            <p style="color: #555555; font-size: 16px;">
                Best regards,<br>
                AVS 😎
            </p>
        </div>`
        })

    }

    catch (error) {
        console.log(error)
    }

}
