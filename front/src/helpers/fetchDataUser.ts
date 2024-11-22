import { jwtVerify } from "jose";
import { IUser } from "./types";

export const fetchDataUserByID = async (
  token: string,
  url: string | undefined,
  id: number | unknown
): Promise<IUser> => {
  try {
    const response = await fetch(`${url}/auth/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (!response.ok) {
      throw new Error(`Error al hacer la peticion: ${response.status}`);
    }
    const data: IUser = await response.json();
    return data;
  } catch (error) {
    console.error("Error al recuperar la informaciòn del user:", error);
    throw error;
  }
};

export const fetchDataUser = async (
  token: string,
  secret: string | undefined,
  url: string | undefined
) => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    
    const data = await fetchDataUserByID(token, url, payload.userId);
    return data;
  } catch (error) {
    console.error("Error fetching data user:", error);
    throw error;
  }
};
