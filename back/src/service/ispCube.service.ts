import fetch from "node-fetch";
import { ClientError } from "../utils/errors";
import { ISPCUBEURL } from "../config/envs";
import LoginIspCubeDto from "../dtos/ispCubeUser";
import { ispCubeUserModel, userModel } from "../config/dataSource";
import { PropsFetchUsersIspCube } from "../utils/types";
import { findByEmail } from "./user.service";
import { encrypt } from "../helpers/hashPropsHeader";
import { User } from "../entities/User";

export const fetchLoginIspCube = async (
  propsFetchUsersIspCube: PropsFetchUsersIspCube
) => {
  try {
    const response = await fetch(`${ISPCUBEURL}/api/sanctum/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": propsFetchUsersIspCube.apiKey,
        "client-id": propsFetchUsersIspCube.clientId,
        "login-type": "api",
      },
      body: JSON.stringify({
        username: propsFetchUsersIspCube.username,
        password: propsFetchUsersIspCube.passwordIspCube,
      }),
    });

    if (!response.ok) {
      throw new ClientError(
        `Error al iniciar sesión: ${response.statusText}`,
        400
      );
    }

    const token: any = await response.json();
    if (!token || typeof token.token !== "string") {
      throw new ClientError(
        "Formato de token inválido recibido de ISP Cube",
        500
      );
    }

    return token;
  } catch (error) {
    console.error("Error en el servicio de IspCube:", error);
    throw new ClientError("No se pudo conectar con IspCube.", 500);
  }
};

export const loginIspCubeService = async (
  loginIspCubeDto: LoginIspCubeDto
): Promise<string> => {
  try {
    const { apiKey, clientId, email, passwordIspCube, username } =
      loginIspCubeDto;
    const user = await findByEmail(email);
    const token = await fetchLoginIspCube({
      apiKey,
      clientId,
      passwordIspCube,
      username,
    });
    if (!user.ispCubeUser) {
      const encryptedApiKey = encrypt(apiKey);
      const encryptedClientId = encrypt(clientId);

      const userIspCube = ispCubeUserModel.create({
        apiKey: encryptedApiKey,
        clientId: encryptedClientId,
        username,
      });
      await ispCubeUserModel.save(userIspCube);
      user.ispCubeUser = userIspCube;
      await userModel.save(user);
    }

    return token;
  } catch (error) {
    console.log(error);
    throw new ClientError("Error al iniciar sesión", 500);
  }
};

export const getUsersFromIspCubeService = async (
  token: string,
  user: User
): Promise<any[]> => {
  if (!user.ispCubeUser) {
    throw new ClientError(
      "El usuario no tiene configuradas credenciales de ISP Cube",
      400
    );
  }
  try {
    const response = await fetch(`${ISPCUBEURL}/api/customers/customers_list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": user.ispCubeUser!.apiKey,
        "client-id": user.ispCubeUser!.clientId,
        username: user.ispCubeUser!.username,
        "login-type": "api",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new ClientError(
        `Error al obtener datos de IspCube: ${response.statusText}`,
        400
      );
    }

    const users = await response.json();

    return users;
  } catch (error) {
    console.error("Error en el servicio de IspCube:", error);
    throw new ClientError("No se pudo conectar con IspCube.", 500);
  }
};
