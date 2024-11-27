import { APIKEY_WABLAS, URL_WABLAS } from "../config/envs";
import { ClientError } from "../utils/errors";

export const fetchMessages = async () => {
  try {
    const response = await fetch(`${URL_WABLAS}/report-realtime`, {
      headers: { Authorization: APIKEY_WABLAS },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new ClientError("Error al obtener los mensajes", 500);
  }
};

export const sendMessages = async (message: string, phones: string[]) => {
  try {
    const validPhones = phones.filter(
      (phone) => phone !== undefined && phone !== "undefined"
    );

    if (validPhones.length === 0) {
      throw new ClientError(
        "No hay números válidos para enviar mensajes.",
        400
      );
    }
    const phoneNumbers = validPhones.join(",");
    const dataSend = {
      phone: phoneNumbers,
      message: message,
    };
    const urlEncodedData = new URLSearchParams(dataSend).toString();
    const response = await fetch(`${URL_WABLAS}/send-message`, {
      method: "POST",
      headers: {
        Authorization: APIKEY_WABLAS,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncodedData,
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new ClientError("Error al enviar los mensajes", 500);
  }
};

export const fetchQrCode = () => {
  try {
    const urlQr = `${URL_WABLAS}/device/scan?token=${APIKEY_WABLAS}`;
    return urlQr;
  } catch (error) {
    console.log(error);
    throw new ClientError("Error al generar QR");
  }
};
