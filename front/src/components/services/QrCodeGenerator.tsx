import { IUser, RootState } from "@/helpers/types";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import style from "../forms/button.module.css";
import { fetchInfoDevice } from "@/helpers/fetchDevice"; 

const QRCodeComponent: React.FC = () => {
  const appUrl = process.env.NEXT_PUBLIC_URL_WABLAS;
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [isScanned, setIsScanned] = useState<boolean>(false);
  const [deviceStatus, setDeviceStatus] = useState<string | null>(null); 
  const dataUser: IUser = useSelector((state: RootState) => state.user.user);
  const token: string = useSelector((state: RootState) => state.user.token);
  const alertShown = useRef(false);
  const pollingInterval = useRef<NodeJS.Timeout | null>(null); 

  useEffect(() => {
    
    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, []);

  const generateQRCode = () => {
    if (isScanned) return;
    setLoading(true);
    setIsScanned(false);
    alertShown.current = false;

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
            data.is_ready === 1 &&
            !isScanned
          ) {
            if (!alertShown.current) {
              alertShown.current = true;
              setIsScanned(true);
              stopWorker();
              Swal.fire({
                title: "¡Escaneo exitoso!",
                text: "Ahora su dispositivo está conectado",
                icon: "success",
              }).then(() => {
               
                startPolling();
              });
            }
          }
        } else {
          console.log(event.data);
        }
      };
    } else {
      console.error("Web Worker no soportado en este navegador");
    }
  };

  const startPolling = () => {
    pollingInterval.current = setInterval(() => {
     
      fetchInfoDevice(dataUser?.id, process.env.NEXT_PUBLIC_URL!, token)
        .then((res) => {
          if (res.data.status === "connected") {
           
            setDeviceStatus("connected");
            clearInterval(pollingInterval.current!);
            pollingInterval.current = null;
          } else {
            
            setDeviceStatus("disconnected");
          }
        })
        .catch((err) => {
          console.error("Error al obtener el estado del dispositivo:", err);
        });
    }, 5000); 
  };

  const stopWorker = () => {
    if (worker) {
      worker.terminate();
      setWorker(null);
    }
    setQrImage(null);
    setLoading(false);
  };

  const getButtonText = () => {
    if (loading) {
      return "Generando...";
    }
    if (deviceStatus === "connected") {
      return "Conectado";
    }
    if (deviceStatus === "disconnected") {
      return <span className={style.loader}></span>;
    }
    return "Generar QR";
  };

  return (
    <div className="text-custom-white md:mb-0 mb-2">
      <button
        className="bg-transparent border medium-xs:w-auto w-2/3 min-w-44 border-custom-blue rounded-md py-2 px-3 hover:bg-custom-blue"
        onClick={generateQRCode}
        disabled={loading}
      >
        {getButtonText()}
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
          <p>El QR expira en: 40 segundos.</p>
        </>
      )}
      {deviceStatus && (
        <p>
          {deviceStatus === "connected"
            ? "Dispositivo conectado"
            : "Esperando conexión..."}
        </p>
      )}
    </div>
  );
};

export default QRCodeComponent;
