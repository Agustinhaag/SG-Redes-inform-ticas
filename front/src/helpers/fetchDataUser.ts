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
  url: string | undefined
) => {
  try {
    const userId = decodeJWT(token);

    // Si el userId no existe, lanzar un error
    if (!userId) {
      throw new Error('El token no contiene un userId válido');
    }
    
    const data = await fetchDataUserByID(token, url, userId);
    return data;
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    throw error;
  }
};

const decodeJWT = (token: string): string | null => {
  try {
    // Separar el token en sus tres partes
    const parts = token.split('.');

    // Si no tiene 3 partes, el token es inválido
    if (parts.length !== 3) {
      throw new Error('Token inválido');
    }

    // Decodificar la parte payload (base64url -> base64)
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Reemplazar base64url por base64

    // Decodificar y parsear el payload como JSON
    const decodedPayload = JSON.parse(atob(base64));

    // Devuelve el userId del payload, si está presente
    return decodedPayload.userId || null;
  } catch (error) {
    console.error('Error decodificando el token:', error);
    return null;
  }
};
