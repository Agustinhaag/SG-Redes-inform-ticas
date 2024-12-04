import Swal from "sweetalert2";

export const fetchAllUsers = async (url: string, token: string) => {
  try {
    const response = await fetch(`${url}/admin`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const activateUser = async (url: string, token: string, id: number) => {
  try {
    const result = await Swal.fire({
      title: "¿Desea cambiar el estado del usuario?",
      text: "El estado cambiara, y debera repetir la operación en caso de querer revertir los cambios.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cambiar.",
      cancelButtonText: "Cancelar",
    });
    if (!result.isConfirmed) {
      Swal.fire({
        title: "Operación cancelada",
        text: "Puede intentarlo nuevamente si lo desea.",
        icon: "info",
      });
      return;
    }
    const response = await fetch(`${url}/admin/toggle-status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      await fetchAllUsers(url, token);
      Swal.fire({
        title: "¡Estado cambiado exitosamente!",
        text: `${data.message}`,
        icon: "success",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const addToken = async (
  url: string,
  token: string,
  apikey: string,
  id: number,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    const result = await Swal.fire({
      title: "¿Desea añadir el token al usuario?",
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
      return false;
    }
    const response = await fetch(`${url}/admin/addToken/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify({ apikey }),
    });
    const data = await response.json();
    if (response.ok) {
      await fetchAllUsers(url, token);
      Swal.fire({
        title: "¡Token almacenado exitosamente!",
        text: "El usuario ya posee acceso a la Api-Key",
        icon: "success",
      });
    }
    return data
  } catch (error: any) {
    console.log(error);
    setError(error);
  }
};
