import Swal from "sweetalert2";

export const sendDevice = async (
  url: string,
  token: string,
  device: string,
  id: number,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setViewModalDevice: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const result = await Swal.fire({
      title: "¿Desea añadir el dispositivo al usuario?",
      text: "Ya no podrá modificarlo una vez confirmado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, agregar.",
      cancelButtonText: "Cancelar",
    });
    if (!result.isConfirmed) {
      Swal.fire({
        title: "Operación cancelada",
        text: "Puede intentarlo nuevamente si lo desea.",
        icon: "info",
      });
      setLoading(false);
      return false;
    }
    const response = await fetch(`${url}/auth/addDevice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify({ id, device }),
    });
    const data = await response.json();

    if (response.ok) {
      setViewModalDevice(false);
      Swal.fire({
        title: "¡Dispositivo almacenado exitosamente!",
        text: "El usuario ya posee un dispositivo para mensajeria",
        icon: "success",
      });
    }
    return data;
  } catch (error: any) {
    console.log(error);
    setError(error);
  }
};

export const fetchInfoDevice = async (
  id: number,
  url: string,
  token: string
) => {
  try {
    const response = await fetch(`${url}/wablas/infoDevice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
