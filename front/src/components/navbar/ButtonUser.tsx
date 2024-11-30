import PATHROUTES from "@/helpers/PathRoutes";
import { IUser } from "@/helpers/types";
import Link from "next/link";
import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";

const ButtonUser: React.FC<{
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
  dataUser: IUser;
}> = ({ setIsMenuOpen, isMenuOpen, menuRef, dataUser }) => {
  return (
    <div className="relative">
      <button
        className="md:flex hidden items-center gap-2 text-custom-white"
        disabled={isMenuOpen}
        onClick={(e) => {
   
          setIsMenuOpen((prev) => !prev); // Alterna el estado del menú
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
            href={PATHROUTES.DASHBOARD}
            className="block px-4 py-2 hover:bg-gray-700 rounded"
          >
            Perfil
          </Link>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
            onClick={() => {
              // Lógica para cerrar sesión
              console.log("Cerrar sesión");
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
