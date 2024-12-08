"use client";
import React from "react";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import SubNav from "./navbar/SubNav";
import Image from "next/image";
import { FaSquareXTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { IUser } from "@/helpers/types";

const Footer: React.FC = () => {
  const dataUser: IUser = useSelector((state: any) => state.user.user);
  return (
    <footer className="bg-zinc-800 bg-opacity-30 backdrop-blur shadow-lg w-full h-full pb-1">
      <div className="flex sm:pr-24 sm:pl-9 pr-5 pl-5 justify-between h-4/5 py-5">
        <div className="">
          <Image
            loading="lazy"
            src="/files/SG-FB-logo.png"
            alt="Garagejs"
            width={80}
            height={80}
            className="sm:w-[70px] w-14"
          />
        </div>
        <div className="flex justify-around w-1/5">
          <SubNav typeClass={false} dataUser={dataUser} />
        </div>
        <div className="sm:flex hidden flex-col text-custom-grey pr-2">
          <h3 className="text-custom-white text-lg pb-3">Contáctenos:</h3>
          <div className="flex flex-col gap-5">
            <p className="flex gap-1 items-center">
              <span>
                <FaPhoneAlt className="text-custom-blue" />
              </span>
              5493435066999
            </p>
            <p className="flex gap-1 items-center">
              <span>
                <FaWhatsapp className="text-custom-blue" />
              </span>
              5493435066999
            </p>
            <p className="flex gap-1 items-center">
              <span>
                <MdEmail className="text-custom-blue" />
              </span>
              contacto@sgredesinformaticas.com.ar
            </p>
          </div>
        </div>
        <div className="flex flex-col  items-center gap-5">
          <Link href={"https://x.com/"} className="text-2xl">
            <FaSquareXTwitter className="text-custom-blue" />
          </Link>
          <Link
            href={
              "https://www.linkedin.com/in/agustin-gerardo-haag-letterucci-8a6546225/"
            }
            className="text-2xl"
          >
            <FaLinkedin className="text-custom-blue" />
          </Link>
          <Link href={"https://www.youtube.com/"} className="text-2xl">
            <FaYoutube className="text-custom-blue" />
          </Link>
          <Link
            href={"https://www.instagram.com/agushaag22/"}
            className="text-2xl"
          >
            <FaInstagram className="text-custom-blue" />
          </Link>
        </div>
      </div>
      <p className="text-center text-custom-grey">
        &copy; 2024 GarageJS. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
