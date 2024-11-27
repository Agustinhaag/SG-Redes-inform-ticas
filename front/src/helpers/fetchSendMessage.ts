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
        phones: ["5493548604817"],
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
  message: string,
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
    title: "Confirma que desea hacer el envio masivo de mensajes?",
    text: "Si no ha asignado parametros de filtrado el mensaje se enviara a todos los usuarios.",
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
    recipients = users.map((user) => user.phones[0]?.number);
    setViewModalMessage(false);
  } else {
    recipients =
      manualSelection.length > 0
        ? manualSelection.map((key) => key.split("-")[1])
        : filteredUsers.map((user) => user.phones[0]?.number);
  }

  // Prepara el payload para el envío
  const payload = { message, recipients };

  try {
    console.log("Payload enviado:", payload);
    // Aquí iría la lógica de envío al servidor, e.g.:
    await fetchSendMessage(
      url,
      payload.message,
      payload.recipients,
      setError,
      token,
      setViewModalMessage
    );
  } catch (err) {
    Swal.fire({
      title: "Error",
      text: "Hubo un problema al enviar los mensajes.",
      icon: "error",
    });
    console.error("Error al enviar mensajes:", err);
  }
};
