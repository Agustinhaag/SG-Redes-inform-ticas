import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const validateJWT = async (
  secret: string | undefined,
  user: string
): Promise<boolean> => {
  try {
    const { payload } = await jwtVerify(user, new TextEncoder().encode(secret));

    if (!payload.id || !payload.iat || !payload.exp) {
      console.error(
        "Falta el id del usuario o dato de emisión o fecha de expiración:",
        payload
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("JWT Validation Error:", error);
    return false;
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
    const validateToken = await validateJWT(secret, userData);
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
  matcher: ["/services", "/dashboard", "/sistems"], //rutas protegidas
};
