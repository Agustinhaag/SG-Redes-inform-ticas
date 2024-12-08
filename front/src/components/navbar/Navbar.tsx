"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import SubNav from "./SubNav";
import { useSelector } from "react-redux";

import PATHROUTES from "@/helpers/PathRoutes";
import { IUser } from "@/helpers/types";
import ButtonUser from "./ButtonUser";

const Navbar: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const dataUser: IUser = useSelector((state: any) => state.user.user);
  const token: string = useSelector((state: any) => state.user.token);

  useEffect(() => {
    const menu: HTMLElement | null = document.getElementById("menu");
    const mostrar: HTMLElement | null = document.getElementById("mostrar");
    const cerrar: HTMLElement | null = document.getElementById("cerrar");
    const enlaces: NodeListOf<Element> = document.querySelectorAll(".enlaces");

    const handleMostrarClick = () => {
      if (menu) {
        menu.classList.add("visible");
        menu.style.transition = "0.6s";
        mostrar && (mostrar.style.visibility = "hidden");
      }
    };

    const handleCerrarClick = () => {
      if (menu) {
        menu.classList.remove("visible");
        mostrar && (mostrar.style.visibility = "visible");
      }
    };

    mostrar?.addEventListener("click", handleMostrarClick);
    cerrar?.addEventListener("click", handleCerrarClick);

    enlaces.forEach((enlace) => {
      const handleEnlaceClick = () => {
        if (menu) {
          menu.classList.remove("visible");
          mostrar && (mostrar.style.visibility = "visible");
        }
      };
      enlace.addEventListener("click", handleEnlaceClick);

      // Cleanup listener on unmount
      return () => {
        enlace.removeEventListener("click", handleEnlaceClick);
      };
    });

    return () => {
      mostrar?.removeEventListener("click", handleMostrarClick);
      cerrar?.removeEventListener("click", handleCerrarClick);
    };
  }, [token]);

  return (
    <header
      ref={headerRef}
      className="flex bg-black bg-opacity-20 backdrop-blur-xl shadow-lg justify-around items-center fixed w-full py-3 px-6 z-50 transition-colors duration-300"
    >
      <div className="pl-3 flex w-3/5 gap-4">
        <Image
          src={"/files/SG-FB-logo.png"}
          alt="Garagejs"
          width={40}
          height={10}
        />

        <div className="pl-2 flex items-center">
          <SubNav typeClass={true} dataUser={dataUser} />
        </div>
      </div>

      <div className="w-2/5 flex justify-end">
        <span
          id="mostrar"
          className="md:hidden text-white flex cursor-pointer text-2xl relative right-1 order-1"
        >
          <RxHamburgerMenu />
        </span>
        {token && dataUser ? (
          <ButtonUser dataUser={dataUser} />
        ) : (
          <div className="md:flex hidden sm:gap-4 sm:text-lg text-sm gap-2 sm:flex-row flex-col text-custom-white">
            <Link
              href={PATHROUTES.LOGIN}
              className="enlaces text-custom-white bg-custom-blue py-1 px-3 rounded w-24 text-center hover:bg-blue-700"
            >
              Acceder
            </Link>
            <Link
              href={PATHROUTES.REGISTER}
              className="enlaces text-sky-900 bg-custom-white py-1 px-3 w-24 rounded-md border hover:text-custom-white hover:bg-transparent hover:border-custom-white"
            >
              Registro
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
