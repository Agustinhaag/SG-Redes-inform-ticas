import React, { useState, useRef, useEffect } from "react";
import PATHROUTES from "@/helpers/PathRoutes";
import { IUser } from "@/helpers/types";
import { logout } from "@/redux/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegCircleUser } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const ButtonUser: React.FC<{
  dataUser: IUser;
  subNav?: boolean;
  menuRef?: React.RefObject<HTMLDivElement>;
  mostrarRef?: React.RefObject<HTMLDivElement>;
}> = ({ dataUser, subNav, menuRef, mostrarRef }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const subMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    Swal.fire({
      title: "¿Está seguro/a de cerrar sesión?",
      text: "Deberá volver a ingresar para operar",
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
      }
    });
  };

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        subMenuRef &&
        subMenuRef.current &&
        !subMenuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Cierra el submenú
    if (menuRef && mostrarRef && menuRef.current) {
      menuRef.current.classList.remove("visible");
      mostrarRef.current?.classList.add("visibleMain");
    }
  };

  return (
    <div className={`${subNav && "justify-end"} flex relative`}>
      <button
        disabled={isMenuOpen}
        className={`${
          subNav ? "md:hidden flex" : "md:flex hidden"
        } items-center gap-2 text-custom-white enlaces`}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <p
          className={` text-xl font-medium overflow-hidden max-w-40 max-h-8 capitalize`}
        >
          {dataUser?.name}
        </p>
        <span className="text-5xl">
          <FaRegCircleUser />
        </span>
      </button>
      {isMenuOpen && (
        <div
          ref={subMenuRef}
          className={`absolute ${
            subNav ? "bg-[#1f1f1f] pt-0" : "bg-gray-800 pt-3"
          } top-[50px] right-0 text-white rounded shadow-lg px-3 pb-3 w-48`}
        >
          <Link
            href={`${PATHROUTES.DASHBOARD}/user`}
            className="block px-4 py-2 hover:bg-gray-700 rounded"
            onClick={handleLinkClick}
          >
            Perfil
          </Link>
          {dataUser.role === "admin" && (
            <Link
              href={`${PATHROUTES.DASHBOARD}/admin`}
              className="block px-4 py-2 hover:bg-gray-700 rounded"
              onClick={handleLinkClick}
            >
              Administrador
            </Link>
          )}
          <button
            className={`block text-red-500 w-full ${
              subNav ? "text-right" : "text-left"
            } px-4 py-2 hover:bg-gray-700 rounded`}
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default ButtonUser;
