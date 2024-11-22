"use client";

import { jwtVerify } from "jose";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PATHROUTES from "@/helpers/PathRoutes";
import Link from "next/link";
import FormResetPassword from "@/components/FormResetPassword";

const ResetPassword: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [statusToken, setStatusToken] = useState<boolean>();

  const secret = process.env.NEXT_PUBLIC_SECRET;
  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        try {
          if (!secret) {
            setStatusToken(false);
            throw new Error("La clave secreta JWT no está definida.");
          }

          const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(secret)
          );
          setStatusToken(true);
        } catch (error: any) {
          if (error.message.includes('"exp" claim timestamp check failed')) {
            setStatusToken(false);
            console.log("El token expiro");
          } else {
            setStatusToken(false);
            console.log("El enlace es inválido o no se pudo verificar.");
          }
          setStatusToken(false);
          console.log("Error al verificar el token:", error);
        }
      };

      verifyToken();
    }
  }, [token]);

  return (
    <main className="text-custom-white">
      {statusToken ? (
        <FormResetPassword token={token} />
      ) : (
        <div>
          <h2>Lo sentimos, su enlace expiró</h2>
          <p>
            Por favor, inicie nuevamente el reestablecimiento de su contraseña
          </p>
          <Link href={PATHROUTES.LOGIN}>Volver</Link>
        </div>
      )}
    </main>
  );
};

export default ResetPassword;
