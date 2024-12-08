import React from "react";
import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";
import PATHROUTES from "@/helpers/PathRoutes";
import { usePathname } from "next/navigation";
import { IUser } from "@/helpers/types";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import ButtonUser from "./ButtonUser";

interface SubNavProps {
  typeClass: boolean;
  dataUser: IUser;
}

const SubNav: React.FC<SubNavProps> = ({
  typeClass,
  dataUser,
 

 
}) => {
  const tokenIspCube: string = useSelector(
    (state: any) => state.user.tokenIspCube
  );
  const token: string = useSelector((state: any) => state.user.token);
  const classHeader: string =
    "flex flex-col md:gap-6 gap-4 md:visible invisible md:flex-row text-custom-grey justify-start fixed md:relative top-0 right-0 text-right md:justify-between md:w-1/3 w-1/2 min-w-56 z-50 md:py-0 md:px-0 px-5 pt-14 translate-x-full md:translate-x-0 md:h-6";
  const classFooter: string =
    "md:flex flex-col hidden text-custom-grey gap-7 items-start w-auto text-base";
  const pathName = usePathname();

  return (
    <nav
      id="menu"
      className={`${typeClass ? classHeader : classFooter} 
      `}
    >
      <Link
        href={PATHROUTES.LANDING}
        className={`enlaces hover:text-custom-white font-semibold ${
          pathName === PATHROUTES.LANDING ? "text-custom-white" : ""
        } `}
      >
        Inicio
      </Link>

      <Link
        href={PATHROUTES.CONTACT}
        className={`enlaces hover:text-custom-white font-semibold ${
          pathName === PATHROUTES.CONTACT ? "text-custom-white" : ""
        } `}
      >
        Contacto
      </Link>
      <Link
        href={`${PATHROUTES.SISTEMS}`}
        className={`enlaces ${
          dataUser && !tokenIspCube ? "block" : "hidden"
        } hover:text-custom-white font-semibold ${
          pathName === `${PATHROUTES.SISTEMS}` ? "text-custom-white" : ""
        } `}
      >
        Sistemas
      </Link>
      <Link
        href={PATHROUTES.SERVICES}
        className={`enlaces ${
          dataUser && tokenIspCube ? "block" : "hidden"
        } hover:text-custom-white font-semibold ${
          pathName === `${PATHROUTES.SERVICES}` ? "text-custom-white" : ""
        } `}
      >
        Servicios
      </Link>
      {token && dataUser ? (
        <ButtonUser
         
         
          
          dataUser={dataUser}
          subNav={true}
        />
      ) : (
        <div className=" md:hidden flex sm:gap-4 text-lg  gap-2 items-end justify-end flex-col sm:flex-row text-custom-white">
          <Link
            href={PATHROUTES.LOGIN}
            className="enlaces text-custom-white bg-custom-blue py-1 px-3 rounded sm:w-24 w-full text-center hover:bg-blue-700"
          >
            Acceder
          </Link>
          <Link
            href={PATHROUTES.REGISTER}
            className="enlaces text-center text-sky-900 bg-custom-white py-1 px-3 sm:w-24 w-full rounded-md border hover:text-custom-white hover:bg-transparent hover:border-custom-white"
          >
            Registro
          </Link>
        </div>
      )}

      <div className="md:hidden absolute flex top-5 justify-between w-full">
        <p className="text-custom-blue text-2xl font-semibold">SG-Redes</p>
        <span
          id="cerrar"
          className=" cursor-pointer text-2xl absolute right-8 hover:text-custom-white"
        >
          <IoCloseSharp />
        </span>
      </div>
    </nav>
  );
};

export default SubNav;
