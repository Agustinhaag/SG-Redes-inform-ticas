// Función para obtener una instancia de XMLHttpRequest
function getXMLHttp() {
  try {
    return new XMLHttpRequest();
  } catch (error) {
    console.error("Failed to create XMLHttpRequest:", error);
    return null;
  }
}

// Función para manejar la obtención del QR Code
function fetchQRCode(serial, appUrl) {
  const XMLHttp = getXMLHttp();
  if (!XMLHttp) {
    postMessage(
      JSON.stringify({ message: "error", text: "XMLHttpRequest not supported" })
    );
    return;
  }

  XMLHttp.open("GET", `${appUrl}/api/device/qr-code/${serial}`, true);

  XMLHttp.onreadystatechange = function () {
    if (XMLHttp.readyState === 4) {
      if (XMLHttp.status === 200) {
        // Enviar la respuesta al hilo principal
        console.log("Respuesta del servidor:", XMLHttp.responseText);
        postMessage(XMLHttp.responseText);
      } else {
        postMessage(
          JSON.stringify({
            message: "error",
            text: `Failed to fetch QR code: ${XMLHttp.statusText}`,
          })
        );
      }
    }
  };

  try {
    XMLHttp.send();
  } catch (error) {
    postMessage(
      JSON.stringify({
        message: "error",
        text: `Failed to send XMLHttpRequest: ${error.message}`,
      })
    );
  }
}

// Inicialización del Worker
addEventListener("message", function (event) {
  const { serial, app_url: appUrl } = event.data;

  if (!serial || !appUrl) {
    postMessage(
      JSON.stringify({ message: "error", text: "Missing serial or appUrl" })
    );
    return;
  }

  // Inicia la solicitud del QR Code cada segundo
  const intervalId = setInterval(() => fetchQRCode(serial, appUrl), 1000);

  // Limpiar intervalo si se recibe un mensaje para detener el worker
  addEventListener("message", (e) => {
    if (e.data === "stop") {
      clearInterval(intervalId);
      postMessage("Worker stopped");
      close(); // Termina el worker
    }
  });
});
