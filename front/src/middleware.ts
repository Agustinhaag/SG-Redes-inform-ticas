
import { NextRequest, NextResponse } from "next/server";

const validateJWT = (token: string): boolean => {
  try {
    // Decodificar el JWT y extraer el payload
    const userId = decodeJWT(token);

    // Verificar si el userId está presente en el payload
    if (!userId) {
      console.error("Falta el userId en el token");
      return false;
    }

    // Si no falta el userId, retornamos true
    return true;
  } catch (error) {
    console.error("Error validando el token:", error);
    return false;
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

export const middleware = async (request: NextRequest) => {
  const secret = process.env.SECRET;
  const userData = request.cookies.get("token")?.value;
  const ispCubeToken = request.cookies.get("tokenIspCube")?.value;
  const { pathname } = request.nextUrl;

  if (!userData) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (userData) {
    const validateToken = await validateJWT(userData);
    if (validateToken === true) {
      return NextResponse.next();
    }
  }

  if (pathname.startsWith("/services")) {
    if (!ispCubeToken) {
      return NextResponse.redirect(new URL("/sistems", request.url)); // Redirige al login de ISPCube
    }
  }
};

export const config = {
  matcher: [
    "/services",
    "/dashboard",
    "/sistems",
    "/devices",
    "/dashboard/user",
    "/dashboard/admin",
  ], 
};
