import Swal from "sweetalert2";
import { HandlePropsRegister, IUserIspCube } from "./types";

export const handleSubmit = async ({
  setError,
  textError,
  textSwal,
  titleSwal,
  url,
  values,
}: HandlePropsRegister) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        title: titleSwal,
        text:
          data.userStatus === "suspended"
            ? "Su usuario esta suspendido aún"
            : textSwal,
        icon: "success",
      });

      return { response, data };
    } else {
      const errorMessage = data.error || textError;
      setError(errorMessage);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error en handleSubmit:", error.message);
      setError(error.message || textError);
    } else {
      console.error("Error desconocido en handleSubmit:", error);
      setError(textError); // Usa un mensaje de error predeterminado si no es una instancia de Error
    }
  }
};

export const handleSubmitIpsCube = async (
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  token: string,
  email: string,
  url: string,
  values: IUserIspCube,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const body = {
      ...values,
      email,
    };
    const response = await fetch(`${url}/ispCube/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },

      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        title: "¡Integración exitosa!",
        text: "",
        icon: "success",
      });

      return { response, data };
    } else {
      const errorMessage = data.error;
      setError(errorMessage);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error en handleSubmit:", error.message);
      setError(error.message);
    } else {
      console.error("Error desconocido en handleSubmit:", error);
    }
  } finally {
    setLoading(false);
  }
};
