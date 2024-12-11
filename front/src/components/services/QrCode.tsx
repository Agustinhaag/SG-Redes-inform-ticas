import React, { useState, useEffect } from "react";
import * as QRCode from "qrcode";
import { fetchScanQrCode } from "@/helpers/fetchSendMessage";
import Cookies from "js-cookie";
import { IUser, RootState } from "@/helpers/types";
import { useSelector } from "react-redux";

interface QrCodeProps {
  appUrl: string;
  serial: string;
}

const QrCodeGenerator: React.FC<QrCodeProps> = ({ appUrl, serial }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.NEXT_PUBLIC_URL;
  const token = Cookies.get("token");
  const dataUser: IUser = useSelector((state: RootState) => state.user.user);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQrCode = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchScanQrCode(
          url!,
          token!,
          dataUser.id,
          setIsLoading
        );
console.log(data)
        if ( data) {
          const canvas = document.createElement("canvas");
          await QRCode.toCanvas(canvas, data, {
            width: 256,
            margin: 4,
          });
          const dataURL = canvas.toDataURL("image/png");
          setQrCodeUrl(dataURL);
        } else {
          setError("Error al generar el código QR");
        }
      } catch (error) {
        console.error("Error al obtener el código QR:", error);
        setError("Error al obtener el código QR");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQrCode();
  }, [appUrl, serial]);

  return (
    <div>
      {isLoading ? (
        <p>Generando código QR...</p>
      ) : error ? (
        <p>{error}</p>
      ) : qrCodeUrl ? (
        <img src={qrCodeUrl} alt="Código QR" />
      ) : (
        <p>No se pudo generar el código QR</p>
      )}
    </div>
  );
};

export default QrCodeGenerator;
