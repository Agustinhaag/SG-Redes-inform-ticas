import Swal from "sweetalert2";

export const fetchResetPassword = async (url: string, email: string) => {
  try {
    const response = await fetch(`${url}/auth/password-reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (response.ok) {
      Swal.fire({
        title: "¡Correo enviado!",
        text: "Por favor siga las revise su casilla y siga las instrucciones",
        icon: "success",
      });
    }
    return response;
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "No se pudo enviar el correo",
      text: "Por favor intentelo nuevamente",
      icon: "warning",
    });
  }
};

export const fetchSendNewPassword = async (
  url: string,
  password: string,
  token: string | null
) => {
  try {
    const response = await fetch(`${url}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: password }),
    });
    const data = await response.json();
    if (response.ok) {
      Swal.fire({
        title: "¡Contraseña reestablecida!",
        text: "Su nueva contraseña se ha guardado correctamente",
        icon: "success",
      });
    }
    return response;
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "No se pudo reestablecer la contraseña",
      text: "Por favor intentelo nuevamente",
      icon: "warning",
    });
  }
};
