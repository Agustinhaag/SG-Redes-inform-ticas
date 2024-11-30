import Swal from "sweetalert2";

const fetchSendMessage = async (
  url: string,
  message: string,
  phones: string[],
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  token: string,
  setViewModalMessage: React.Dispatch<React.SetStateAction<boolean>>
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
        phones: ["2915036060"],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setViewModalMessage(false);
      Swal.fire({
        title: "Mensajes enviados",
        text: "¡Se han enviado a todos los usuarios seleccionados!",
        icon: "success",
      });

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
  personalizedMessages: string[], // Ahora este es un arreglo de mensajes personalizados
  setFilteredUsers: React.Dispatch<React.SetStateAction<any[]>>,
  setManualSelection: React.Dispatch<React.SetStateAction<any[]>>,
  resetForm: () => void,
  setViewModalMessage: React.Dispatch<React.SetStateAction<boolean>>,
  url: string,
  token: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<void> => {
  const noSelection =
    (!manualSelection || manualSelection.length === 0) &&
    (!filteredUsers || filteredUsers.length === 0);

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

  // Prepara el payload para el envío
  try {
    for (let i = 0; i < recipients.length; i++) {
      const message = personalizedMessages[i]; // Toma el mensaje personalizado para este usuario
      await fetchSendMessage(
        url,
        message,
        [recipients[i]], // Enviar solo a este destinatario
        setError,
        token,
        setViewModalMessage
      );
    }

    Swal.fire({
      title: "Envío exitoso",
      text: "Todos los mensajes fueron enviados correctamente.",
      icon: "success",
    });
  } catch (err) {
    Swal.fire({
      title: "Error",
      text: "Hubo un problema al enviar los mensajes.",
      icon: "error",
    });
    console.error("Error al enviar mensajes:", err);
  }
};

export const fetchAllMessages = async (token: string, url: string) => {
  try {
    const response = await fetch(`${url}/wablas/fetchInfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
