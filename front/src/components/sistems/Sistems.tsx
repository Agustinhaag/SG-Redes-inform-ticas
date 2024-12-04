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
    return <Spinner title="Cargando"/>;
  }

  return (
    <main className="text-custom-white">
      {hasToken ? (
        <section>
          <h1>Ya ha seleccionado un sistema para operar</h1>
          <Link href={PATHROUTES.LANDING}>Volver</Link>
          <button onClick={changeSistem}>Elegir otro sistema</button>
        </section>
      ) : (
        <section>
          <h1>¡Bienvenidos!</h1>
          <p>
            Por favor seleccione el sistema con el que desea comenzar a operar
          </p>
          <div>
            <CardSistem img="/files/logo-ispcube.png" name="IspCube" />
          </div>
        </section>
      )}
    </main>
  );
};

export default Sistems;
