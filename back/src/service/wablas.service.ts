import { userModel } from "../config/dataSource";
import { URL_WABLAS } from "../config/envs";
import { User } from "../entities/User";
import { decrypt } from "../helpers/hashPropsHeader";
import {
  handleDataIspcube,
  personalizeMessage,
} from "../helpers/helperSendMessage";
import { ClientError } from "../utils/errors";
import { getUsersFromIspCubeService } from "./ispCube.service";
import { findByEmail } from "./user.service";

const hashRevertToken = async (userId: number) => {
  try {
    const user = await userModel.findOne({ where: { id: userId } });
    if (!user) {
      throw new ClientError("Usuario no encontrado", 404);
    }
    if (!user.tokenwablas) {
      return null;
    } else {
      return decrypt(user.tokenwablas);
    }
  } catch (error) {
    throw new ClientError("Error al decifrar el token", 500);
  }
};

export const fetchMessages = async (userId: number) => {
  try {
    const token = await hashRevertToken(userId);
const tokenWithSecret = token && token.split(".")[0];
    if (token) {
      const response = await fetch(`${URL_WABLAS}/report-realtime`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenWithSecret}`,
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
  userId: number,
  tokenIspCube: string,
  email: string
) => {
  try {
    // Filtrar números de teléfono válidos
    const validPhones = phones.filter(
      (phone) => phone !== undefined && phone !== "undefined"
    );

    if (validPhones.length === 0) {
      throw new ClientError(
        "No hay números válidos para enviar mensajes.",
        400
      );
    }

    // Responder inmediatamente al frontend después de validar los números
    const response = {
      message:
        "Datos recibidos correctamente. El proceso de envío se está gestionando.",
    };

    // Después de la validación, ejecutamos el resto del proceso en segundo plano
    processMessagesInBackground(
      message,
      validPhones,
      userId,
      tokenIspCube,
      email
    );

    return response; // Respuesta inmediata al frontend
  } catch (error) {
    console.error("Error en la validación o en la inicialización:", error);
    throw new ClientError("Error al procesar los mensajes", 500);
  }
};

// Función para procesar el envío de mensajes en segundo plano
const processMessagesInBackground = async (
  message: string,
  phones: string[],
  userId: number,
  tokenIspCube: string,
  email: string
) => {
  try {
    // Obtener información del usuario y los usuarios de IspCube
    const user = await findByEmail(email);
    const usersIspCube = await getUsersFromIspCubeService(tokenIspCube, user);

    // Filtrar usuarios seleccionados
    const usersSelected = usersIspCube.filter((user) =>
      phones.some((phone) => user.phones[0]?.number === phone)
    );

    if (usersSelected.length === 0) {
      throw new ClientError("No se encontraron usuarios seleccionados.", 404);
    }

    // Obtener facturas personalizadas
    const invoices = await handleDataIspcube(tokenIspCube, user, usersSelected);

    // Personalizar mensajes y enviar uno por uno
    const results = [];
    for (const userSelected of usersSelected) {
      const personalizedMessage = personalizeMessage(
        message,
        userSelected,
        invoices
      );
      const phone = userSelected.phones[0]?.number;

      const token = await hashRevertToken(userId);
      if (!token) {
        throw new ClientError("Error al obtener el token de Wablas.", 500);
      }

      const dataSend = new URLSearchParams({
        phone,
        message: personalizedMessage,
      }).toString();

      try {
        const response = await fetch(`${URL_WABLAS}/send-message`, {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: dataSend,
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Error al enviar mensaje.");
        }

        results.push({ phone, status: "success", response: data });
      } catch (err: any) {
        console.error(`Error enviando a ${phone}:`, err.message);
        results.push({ phone, status: "error", error: err.message });
      }
    }
  } catch (error) {
    console.error("Error en el proceso en segundo plano:", error);
    // Aquí puedes agregar un sistema de notificación o guardar el error en un log
  }
};

export const fetchDeviceInfo = async (userId: number) => {
  try {
    const token = await hashRevertToken(userId);
    if (!token) {
      return false;
    }
const tokenWithSecret = token && token.split(".")[0];
    const response = await fetch(`${URL_WABLAS}/device/info?token=${tokenWithSecret}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
