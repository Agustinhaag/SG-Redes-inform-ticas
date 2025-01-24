"use client";
import React from "react";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import {  FaWhatsapp } from "react-icons/fa6";

const Footer: React.FC = () => {
  
  return (
    <footer className="bg-zinc-800 text-custom-grey bg-opacity-30 backdrop-blur shadow-lg w-full h-full pb-2">
      <div className="flex medium-xs:flex-row flex-col py-5 medium-xs:pl-0 pl-5  w-full justify-center gap-6">
        <Link href="https://api.whatsapp.com/send?phone=5493434151061" className="flex gap-1 items-center">
          <span>
            <FaWhatsapp className="text-custom-blue" />
          </span>
          3435066999
        </Link>
        <p className="flex gap-1 items-center">
          <span>
            <MdEmail className="text-custom-blue" />
          </span>
          contacto@sgredesinformaticas.com.ar
        </p>
      </div>

      <p className="text-center ">
        &copy; 2025 SG-Redes informáticas. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
