"use client";
import React from "react";
import { useSelector } from "react-redux";
import { IUser } from "@/helpers/types";
import Image from "next/image";

const InfoAccount: React.FC = () => {
  const dataUser: IUser = useSelector((state: any) => state.user.user);

  return (
    <section className="md:w-3/4 w-full mt-2 mr-4 md:mb-0 mb-6">
      {dataUser && (
        <>
          <div className="bg-black py-6 pl-3 bg-opacity-70 flex gap-4 rounded items-center text-custom-white">
            <div className="relative">
              <Image
                alt="User Image"
                src="/files/userPerfil2.png"
                height={160}
                width={160}
                className="sm:w-36 xs:w-28 w-24 rounded-full min-h-28 min-w-32 max-h-40"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold sm:text-3xl text-xl">
                {dataUser.name}
              </h2>
              <p className="font-light text-base ">{dataUser.email}</p>
            </div>
          </div>
          <div className="text-custom-white flex flex-col sm:gap-5 w-full">
            <div className="flex xs:flex-row flex-col xs:gap-0 gap-2 text-start pt-3 xs:pb-5 pb-2">
              <div className="w-1/2 xs:block flex gap-1 xs:gap-0">
                <span className="font-light text-custom-grey">Nombre:</span>
                <p>{dataUser.name + dataUser.surname}</p>
              </div>
              <div className="w-1/2 xs:block flex gap-1 xs:gap-0">
                <span className="font-light text-custom-grey">Email:</span>
                <p>{dataUser.email}</p>
              </div>
            </div>
            <div className="flex xs:flex-row flex-col xs:gap-0 gap-2 text-start">
              <div className="w-1/2 xs:block flex gap-1 xs:gap-0">
                <span className="font-light text-custom-grey min-w-[120px]">
                  Estado de cuenta:
                </span>
                <p
                  className={` ${
                    dataUser.status === "suspended"
                      ? "text-red-600"
                      : "text-green-600"
                  } capitalize`}
                >
                  {dataUser.status === "suspended" ? "suspendido" : "activado"}
                </p>
              </div>
              <div className="w-1/2 xs:block flex gap-1 xs:gap-0">
                <span className="font-light text-custom-grey">Teléfono:</span>
                <p>{dataUser.phone || "Av. San martin 123"}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default InfoAccount;
