import PATHROUTES from "@/helpers/PathRoutes";
import { IUser } from "@/helpers/types";
import { logout } from "@/redux/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const ButtonUser: React.FC<{
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
  dataUser: IUser;
}> = ({ setIsMenuOpen, isMenuOpen, menuRef, dataUser }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
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
        dispatch(logout());
        router.push(PATHROUTES.LANDING);
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
    <div className="relative">
      <button
        className="md:flex hidden items-center gap-2 text-custom-white"
        disabled={isMenuOpen}
        onClick={() => {
          setIsMenuOpen((prev) => !prev);
        }}
      >
        <p className="text-xl font-medium overflow-hidden max-w-40 max-h-8 capitalize">
          {dataUser?.name}
        </p>
        <span className="text-5xl">
          <FaRegCircleUser />
        </span>
      </button>
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-12 right-0 bg-gray-800 text-white rounded shadow-lg p-3 w-48"
        >
          <Link
            href={`${PATHROUTES.DASHBOARD}/user`}
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
            }}
            className="block px-4 py-2 hover:bg-gray-700 rounded"
          >
            Perfil
          </Link>
          {dataUser.role === "admin" && (
            <Link
              href={`${PATHROUTES.DASHBOARD}/admin`}
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
              }}
              className="block px-4 py-2 hover:bg-gray-700 rounded"
            >
              Administrador
            </Link>
          )}
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
            onClick={() => {
              handleLogout();
            }}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default ButtonUser;
