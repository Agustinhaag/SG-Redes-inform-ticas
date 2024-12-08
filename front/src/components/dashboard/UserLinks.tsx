"use client";
import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import {
  MdAdminPanelSettings,
  MdLogout,
  MdMiscellaneousServices,
} from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import PATHROUTES from "@/helpers/PathRoutes";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { IUser } from "@/helpers/types";
import { logout } from "@/redux/userSlice";

const UserLinks: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathName = usePathname();
  const tokenIspCube: string =
    useSelector((state: any) => state.user.tokenIspCube) || "";
  const dataUser: IUser | null =
    useSelector((state: any) => state.user.user) || null;

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
    <section className="flex md:flex-col mr-1 flex-row md:w-1/4 w-full justify-between md:items-start items-end h-full md:min-h-[480px] py-3">
      <div className="flex flex-col gap-4 text-custom-grey">
        <div className="flex gap-2 items-center">
          <span className="text-xl">
            <FaRegCircleUser />
          </span>
          <Link
            href={`${PATHROUTES.DASHBOARD}/user`}
            className={`hover:text-custom-white ${
              pathName === `${PATHROUTES.DASHBOARD}/user`
                ? "text-custom-white"
                : ""
            }`}
          >
            Mi cuenta
          </Link>
        </div>
        {dataUser && dataUser.role === "admin" && (
          <>
            <div className="flex gap-2 items-center">
              <span className="text-xl">
                <MdMiscellaneousServices />
              </span>
              <Link
                href={tokenIspCube ? PATHROUTES.SERVICES : PATHROUTES.SISTEMS}
                className="hover:text-custom-white"
              >
                {tokenIspCube ? "Servicios" : "Sistemas"}
              </Link>
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-xl">
                <MdAdminPanelSettings />
              </span>
              <Link
                href={`${PATHROUTES.DASHBOARD}/admin`}
                className={`hover:text-custom-white ${
                  pathName === `${PATHROUTES.DASHBOARD}/admin`
                    ? "text-custom-white"
                    : ""
                }`}
              >
                Administrador
              </Link>
            </div>
          </>
        )}
      </div>
      {dataUser && (
        <>
          <button
            onClick={handleLogout}
            className="border md:w-1/2 w-1/5 md:h-auto h-12 flex gap-1 items-center text-sm border-custom-blue py-2 px-3 text-center min-w-36 rounded-md bg-transparent text-custom-white hover:bg-custom-blue hover:cursor-pointer"
          >
            <span className="text-xl">
              <MdLogout />
            </span>
            Cerrar sesión
          </button>
        </>
      )}
    </section>
  );
};

export default UserLinks;
