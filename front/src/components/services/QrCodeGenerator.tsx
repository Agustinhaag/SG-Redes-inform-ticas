import { IUser, RootState } from "@/helpers/types";
import { useSelector } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";

const QRCodeComponent: React.FC = () => {
  const appUrl = process.env.NEXT_PUBLIC_URL_WABLAS;
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [worker, setWorker] = useState<Worker | null>(null);
  const dataUser: IUser = useSelector((state: RootState) => state.user.user);

  const generateQRCode = () => {
    setLoading(true);
    fetch(`/api/device/reset-qr-code/${dataUser.deviceid}`)
      .then((response) => response.text())
      .catch((error) => console.error("Error:", error));

    if (typeof Worker !== "undefined") {
      const qrWorker = new Worker(
        new URL("./qrcodeWorker.js", import.meta.url)
      );
      setWorker(qrWorker);

      qrWorker.postMessage({ serial: dataUser.deviceid, appUrl });

      qrWorker.onmessage = (event) => {
        if (event.data !== "wait" && event.data !== "AJAX is unitialized ..") {
          const data = JSON.parse(event.data);
          if (data.message === "success" && data.text !== "") {
            setQrImage(data.image);
          }

          if (
            data.message === "success" &&
            data.text === "" &&
            data.is_ready === 1
          ) {
            stopWorker();
            Swal.fire({
              title: "¡Escaneo exitoso!",
              text: "Ahora su dispositivo esta conectado",
              icon: "success",
            });
          }
        } else {
          console.log(event.data);
        }
      };
    } else {
      console.error("Web Worker no soportado en este navegador");
    }
  };

  const stopWorker = () => {
    if (worker) {
      worker.terminate();
      setWorker(null);
    }
    setQrImage(null);
    setLoading(false);
  };

  return (
    <div>
      <button
        className="bg-transparent  border medium-xs:w-auto w-2/3 min-w-44 border-custom-blue rounded-md py-2 px-3 hover:bg-custom-blue"
        onClick={generateQRCode}
        disabled={loading}
      >
        {loading ? "Generando..." : "Generar QR"}
      </button>
      {qrImage && (
        <>
          <img
            id="qrcode"
            src={qrImage}
            alt="QR Code"
            style={{
              width: "200px",
              border: "1px solid #cccccc",
              borderRadius: "10px",
              marginTop: "5px",
            }}
          />
          <p>El Qr expira en: 40 segundos.</p>
        </>
      )}
    </div>
  );
};

export default QRCodeComponent;
