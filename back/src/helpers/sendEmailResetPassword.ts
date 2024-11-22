import nodemailer from "nodemailer";
import { KEYGMAIL, URL_FRONT, USERGMAIL } from "../config/envs";

export const sendPasswordResetEmail = async (
  email: string,
  token: string
): Promise<void> => {
  try {
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: USERGMAIL,
        pass: KEYGMAIL,
      },
    });

    const resetLink = `${URL_FRONT}/reset-password?token=${token}`;

    const mailOptions = {
      from: USERGMAIL,
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
