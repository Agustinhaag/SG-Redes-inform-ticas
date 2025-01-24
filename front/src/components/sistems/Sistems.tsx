"use client";
import CardSistem from "@/components/sistems/CardSistem";
import PATHROUTES from "@/helpers/PathRoutes";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logoutSistem } from "@/redux/userSlice";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";

const Sistems: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Estado para determinar si hay un token
  const [isReady, setIsReady] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  const tokenIspCube: string | undefined = useSelector(
    (state: any) => state.user?.tokenIspCube
  );

  useEffect(() => {
    const clientToken = Cookies.get("tokenIspCube");
    setHasToken(!!clientToken || !!tokenIspCube);
    setIsReady(true); // Marca que el cliente está listo
  }, [tokenIspCube]);

  const changeSistem = () => {
    Swal.fire({
      title: "¿Está seguro/a de cerrar sesión?",
      text: "Debera volver a ingresar para volver a operar",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión.",
      cancelButtonText: "Cancelar",
    }).then((result: any) => {
      if (result.isConfirmed) {
        dispatch(logoutSistem());
        Swal.fire({
          title: "Sesión cerrada",
          text: "¡Vuelva a ingresar para operar!",
          icon: "success",
        });
        router.push(PATHROUTES.LANDING);
      } else {
        Swal.fire({
          title: "Operación cancelada",
          text: "¡Aún sigue con sesión activa!",
          icon: "info",
        });
      }
    });
  };

  if (!isReady) {
    return <Spinner title="Cargando" />;
  }

  return (
    <main className="text-custom-white">
      {hasToken ? (
        <section className="ml-4 mt-2">
          <h1>Ya ha seleccionado un sistema para operar</h1>
          <div className="flex  gap-8 mt-4">
            <Link
              className="border-neutral-600 border rounded py-1.5 px-4 hover:bg-neutral-600"
              href={PATHROUTES.LANDING}
            >
              Volver
            </Link>
            <button
              className="bg-custom-blue text-white px-4 py-1.5 rounded hover:bg-blue-600"
              onClick={changeSistem}
            >
              Elegir otro sistema
            </button>
          </div>
        </section>
      ) : (
        <section className="pb-3 mt-2">
          <div className=" flex flex-col pl-2">
            <p>
              Antes de proceder con el registro, deberá solicitar los siguientes
              datos al soporte técnico de su sistema de gestión:{" "}
            </p>
            <p className="text-xl my-2 ml-2">Requerimientos:</p>
            <ul className="list-disc pl-5 ml-4">
              <li>Usuario</li>
              <li>Contraseña</li>
              <li>ID de Cliente</li>
              <li>API Key</li>
            </ul>
          </div>
          <div className="flex justify-center w-full">
            <CardSistem img="/files/logo-ispcube.png" name="IspCube" />
          </div>
        </section>
      )}
    </main>
  );
};

export default Sistems;
