import Cookies from "js-cookie";
import { IUser, RootState } from "@/helpers/types";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const QRCodeComponent: React.FC = () => {
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState<number>(35); // Temporizador en segundos
  const [error, setError] = useState<string | null>(null);
  const url = process.env.NEXT_PUBLIC_URL;
  const token = Cookies.get("token");
  const dataUser: IUser = useSelector((state: RootState) => state.user.user);
  const fetchQRCode = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${url}/wablas/scanqr`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
        body: JSON.stringify({ id: dataUser.id }),
      });
      const data = await response.json();
      console.log(data);
      if (data.message === "success" && data.image) {
        setQrImage(data.image); // Actualiza el estado con la URL de la imagen
        setTimer(35);
      } else {
        setError("Failed to fetch QR code. Please try again.");
      }
    } catch (err) {
      console.error("Error fetching QR code:", err);
      setError("An error occurred while fetching the QR code.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let countdown: NodeJS.Timeout;

    if (qrImage && timer > 0) {
      // Reduce el contador cada segundo
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setQrImage(null); // Oculta la imagen cuando el temporizador llega a 0
    }

    return () => clearInterval(countdown); // Limpiar el intervalo cuando se desmonte el componente o cambie el estado
  }, [qrImage, timer]);

  return (
    <div className="w-auto">
      <button
        className="border mb-2 medium-xs:w-auto w-2/3 border-custom-blue rounded-md py-2 px-3 bg-transparent hover:bg-custom-blue"
        onClick={fetchQRCode}
        disabled={loading}
      >
        {loading ? "Generando Qr..." : "Generar Qr"}
      </button>
      {qrImage && (
        <>
          <img
            src={qrImage}
            alt="Generated QR Code"
            style={{
              width: "200px",
              border: "1px solid #cccccc",
              borderRadius: "10px",
            }}
          />
          <p>El Qr expira en: {timer} segundos.</p>
        </>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default QRCodeComponent;
