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
        text: textSwal,
        icon: "success",
      });

      return { response, data };
    } else {
      const errorMessage = data.error || textError;
      setError(errorMessage);
    }
  } catch (error: any) {
    console.error("Error en handleSubmit:", error.message);
    setError(error.message || textError);
  }
};

export const handleSubmitIpsCube = async (
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  token: string,
  email: string,
  url: string,
  values: IUserIspCube
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
        title: "¡Ingreso exitoso!",
        text: "Ahora puede comenzar a operar con IspCube",
        icon: "success",
      });

      return { response, data };
    } else {
      const errorMessage = data.error;
      setError(errorMessage);
    }
  } catch (error: any) {
    console.error("Error en handleSubmitIspCube:", error.message);
    setError(error.message || "Error al ingresar a ISPCube");
  }
};