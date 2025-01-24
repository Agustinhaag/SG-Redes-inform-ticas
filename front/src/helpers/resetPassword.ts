import Swal from "sweetalert2";

export const fetchResetPassword = async (
  url: string,
  email: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true)
    const response = await fetch(`${url}/auth/password-reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    // Revisamos el estado de la respuesta
    if (response.ok) {
      const data = await response.json();
      Swal.fire({
        title: "¡Correo enviado!",
        text: "Por favor revise su casilla y siga las instrucciones.",
        icon: "success",
      });
      setLoading(false)
      return response;
    } else {
      const errorData = await response.json();
      if (
        response.status === 404 &&
        errorData.error ===
          "El correo electrónico no está registrado en nuestra base de datos."
      ) {
        Swal.fire({
          title: "Correo no registrado",
          text: "El correo electrónico ingresado no está asociado a ninguna cuenta.",
          icon: "error",
        });
        setLoading(false)
      } else {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al intentar restablecer la contraseña, por favor intente más tarde.",
          icon: "error",
        });
        setLoading(false)
      }
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "No se pudo enviar el correo",
      text: "Por favor intente nuevamente.",
      icon: "warning",
    });
    setLoading(false)
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
