"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import PATHROUTES from "@/helpers/PathRoutes";
import Link from "next/link";
import FormResetPassword from "@/components/FormResetPassword";

const ResetPasswordContent: React.FC = () => {
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

          setStatusToken(true);
        } catch (error: unknown) {
          if (error instanceof Error) {
            if (error.message.includes('"exp" claim timestamp check failed')) {
              setStatusToken(false);
              console.log("El token expiró.");
            } else {
              setStatusToken(false);
              console.log("El enlace es inválido o no se pudo verificar.");
            }
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
        <div className="flex justify-center flex-col pl-3 pt-2 gap-3">
          <h2 className="text-xl">Lo sentimos, su enlace expiró</h2>
          <p>
            Por favor, inicie nuevamente el restablecimiento de su contraseña
          </p>
          <Link
            href={PATHROUTES.LOGIN}
            className="p-2 w-24 text-center hover:bg-custom-blue rounded-md bg-blue-600 "
          >
            Volver
          </Link>
        </div>
      )}
    </main>
  );
};

const ResetPassword: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPassword;
