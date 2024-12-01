"use client";
import CardSistem from "@/components/sistems/CardSistem";
import PATHROUTES from "@/helpers/PathRoutes";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logoutSistem } from "@/redux/userSlice";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Sistems: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
const tokenIspCube: string | undefined = useSelector(
  (state: any) => state.user?.tokenIspCube
);



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

  return (
    <main className="text-custom-white">
      {tokenIspCube || Cookies.get("tokenIspCube") ? (
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
