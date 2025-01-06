"use client";
import React from "react";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import SubNav from "./navbar/SubNav";
import Image from "next/image";
import { FaSquareXTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { IUser, RootState } from "@/helpers/types";

const Footer: React.FC = () => {
  const dataUser: IUser = useSelector((state: RootState) => state.user.user);
  return (
    <footer className="bg-zinc-800 text-custom-grey bg-opacity-30 backdrop-blur shadow-lg w-full h-full pb-2">
      <div className="flex medium-xs:flex-row flex-col py-5 medium-xs:pl-0 pl-5  w-full justify-center gap-6">
        <p className="flex gap-1 items-center">
          <span>
            <FaWhatsapp className="text-custom-blue" />
          </span>
          3435066999
        </p>
        <p className="flex gap-1 items-center">
          <span>
            <MdEmail className="text-custom-blue" />
          </span>
          contacto@sgredesinformaticas.com.ar
        </p>
      </div>

      <p className="text-center ">
        &copy; 2024 SG-Redes informáticas. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
