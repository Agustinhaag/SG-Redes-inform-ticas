import Swal from "sweetalert2";

const fetchSendMessage = async (
  url: string,
  message: string | undefined,
  phones: string[],
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  token: string,
  id: number
) => {
  try {
    const response = await fetch(`${url}/wablas/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify({
        message,
        phones: ["5493548604817"],
        id,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { response, data };
    } else {
      const errorMessage = data.error;
      setError(errorMessage);
    }
  } catch (error: any) {
    console.error("Error en handleSubmit:", error.message);
    setError(error.message);
  }
};

export const validateSendAll = async (
  manualSelection: string[],
  filteredUsers: any[],
  users: any[],
  personalizedMessages: (string | undefined)[],
  setFilteredUsers: React.Dispatch<React.SetStateAction<any[]>>,
  setManualSelection: React.Dispatch<React.SetStateAction<any[]>>,
  resetForm: () => void,
  setViewModalMessage: React.Dispatch<React.SetStateAction<boolean>>,
  url: string,
  token: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  id: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  setLoading(true);
  const noSelection =
    (!manualSelection || manualSelection.length === 0) &&
    (!filteredUsers || filteredUsers.length === 0);
  if (noSelection) {
    Swal.fire({
      title: "No hay usuarios",
      text: "No se encontraron usuarios para enviar los mensajes.",
      icon: "info",
    });
    setLoading(false);
    return;
  }
  let recipients: string[] = [];
  const result = await Swal.fire({
    title: "Confirma que desea hacer el envío masivo de mensajes?",
    text: "Si no ha asignado parámetros de filtrado, el mensaje se enviará a todos los usuarios.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, enviar.",
    cancelButtonText: "Cancelar",
  });
  if (!result.isConfirmed) {
    // Si el usuario cancela, muestra mensaje y finaliza la ejecución
    Swal.fire({
      title: "Operación cancelada",
      text: "Puede programar un nuevo envío.",
      icon: "info",
    });
    setLoading(false);
    setFilteredUsers([]);
    setManualSelection([]);
    resetForm();
    return;
  }

  if (noSelection) {
    // Filtra usuarios que tienen al menos un número de teléfono
    recipients = users
      .map((user) => user.phones[0]?.number)
      .filter((phone) => phone); // Elimina los valores undefined o null
    setViewModalMessage(false);
  } else {
    // Filtra usuarios que tienen al menos un número de teléfono
    recipients =
      manualSelection.length > 0
        ? manualSelection.map((key) => key.split("-")[1])
        : filteredUsers
            .map((user) => user.phones[0]?.number)
            .filter((phone) => phone); // Elimina los valores undefined o null
  }

  
  try {
    for (let i = 0; i < recipients.length; i++) {
      const message = personalizedMessages[i]; 
      
      await fetchSendMessage(
        url,
        message,
        [recipients[i]], 
        setError,
        token,
        id
      );
    }
    setLoading(true);
    Swal.fire({
      title: "Envío exitoso",
      text: "Todos los mensajes fueron enviados correctamente.",
      icon: "success",
    });
    setViewModalMessage(false);
  } catch (err) {
    setLoading(false);
    Swal.fire({
      title: "Error",
      text: "Hubo un problema al enviar los mensajes.",
      icon: "error",
    });
    console.error("Error al enviar mensajes:", err);
  }
};

export const fetchAllMessages = async (
  token: string,
  url: string,
  id: number
) => {
  try {
    const response = await fetch(`${url}/wablas/fetchInfo`, {
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

export const fetchScanQrCode = async (
  url: string,
  token: string,
  id: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    // const result = await Swal.fire({
    //   title: "¿Generar código QR?",
    //   text: "Generará un código QR para vincular dispositivos.",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Sí, generar.",
    //   cancelButtonText: "Cancelar",
    // });
    // if (!result.isConfirmed) {
    //   Swal.fire({
    //     title: "Operación cancelada",
    //     text: "Puede intentarlo nuevamente si lo desea.",
    //     icon: "info",
    //   });
    //   setLoading(false);
    //   return false;
    // }
    const response = await fetch(`${url}/wablas/scanqr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.text();

    if (data) {
      setLoading(false);
      return data;
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};
