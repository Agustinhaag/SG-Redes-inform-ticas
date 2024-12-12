import { userModel } from "../config/dataSource";
import { URL_WABLAS } from "../config/envs";
import { decrypt } from "../helpers/hashPropsHeader";
import { ClientError } from "../utils/errors";

const hashRevertToken = async (userId: number) => {
  try {
    const user = await userModel.findOne({ where: { id: userId } });

    if (!user) {
      throw new ClientError("Usuario no encontrado", 404);
    }
    if (!user.tokenwablas) {
      throw new ClientError("No posee un token almacenado", 400);
    } else {
      const token = decrypt(user.tokenwablas);
      return token;
    }
  } catch (error) {
    throw new ClientError("Error al decifrar el token", 500);
  }
};

export const fetchMessages = async (userId: number) => {
  try {
    const token = await hashRevertToken(userId);
    if (token) {
      const response = await fetch(`${URL_WABLAS}/report-realtime`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    throw new ClientError("Error al obtener los mensajes", 500);
  }
};

export const sendMessages = async (
  message: string,
  phones: string[],
  userId: number
) => {
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
    const token = await hashRevertToken(userId);
    const response = await fetch(`${URL_WABLAS}/send-message`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncodedData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new ClientError("Error al enviar los mensajes", 500);
  }
};

export const fetchQrCode = async (userId: number) => {
  try {
    const token = await hashRevertToken(userId);
    if (token) {
      const urlQr = `${URL_WABLAS}/device/scan?token=${token}`;
      return urlQr;
    }
  } catch (error) {
    console.log(error);
    throw new ClientError("Error al generar QR");
  }
};
