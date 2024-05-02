import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  try {
    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Reset your password",
      html: `<p>Please reset your password by clicking this link: <a href="${resetLink}">${resetLink}</a></p>`,
    });
  } catch (error) {
    console.error(error);
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const confirmLink = `${process.env.NEXTAUTH_URL}/auth/verify?token=${token}`;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Confirm your email",
      html: `<p>Please confirm your email by clicking this link: <a href="${confirmLink}">${confirmLink}</a></p>`,
    });
  } catch (error) {
    console.error(error);
  }
};
