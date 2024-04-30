import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const confirmLink = `${process.env.NEXTAUTH_URL}/api/auth/verify?token=${token}`;

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
