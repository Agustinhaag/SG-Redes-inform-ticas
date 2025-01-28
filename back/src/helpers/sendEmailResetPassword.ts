import nodemailer from "nodemailer";
import { SMTP_HOST, SMTP_PASS, SMTP_USER, URL_FRONT } from "../config/envs";

export const sendPasswordResetEmail = async (
  email: string,
  token: string
): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST, 
      port: 465, 
      secure: true, 
      auth: {
        user: SMTP_USER, 
        pass: SMTP_PASS, 
      },
    });
    const resetLink = `${URL_FRONT}/reset-password?token=${token}`;

    const mailOptions = {
      from: SMTP_USER,
      to: email,
      subject: "Restablecimiento de contraseña",
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error en sendPasswordResetEmail:", error);
    throw new Error("No se pudo enviar el correo.");
  }
};
