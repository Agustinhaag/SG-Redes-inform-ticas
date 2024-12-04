"use client";
import React from "react";
import { useSelector } from "react-redux";
import { IUser } from "@/helpers/types";
import Image from "next/image";

const InfoAccount: React.FC = () => {
  const dataUser: IUser = useSelector((state: any) => state.user.user);

  return (
    <section className="md:w-3/4 w-full mt-2 mr-4">
      {dataUser && (
        <>
          <div className="bg-black py-6 pl-3 bg-opacity-70 flex gap-4 rounded items-center text-custom-white">
            <div className="relative">
              <Image
                alt="User Image"
                src="/files/userPerfil2.png"
                height={160}
                width={160}
                className="sm:w-36 w-28 rounded-full min-h-36 min-w-32 max-h-40"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold sm:text-3xl text-xl">
                {dataUser.name}
              </h2>
              <p className="font-light sm:text-base text-xs">
                {dataUser.email}
              </p>
            </div>
          </div>
          <div className="text-custom-white flex flex-col sm:gap-5 w-full">
            <div className="flex sm:flex-row flex-col sm:gap-0 gap-2 text-start pt-3 pb-5">
              <div className="w-1/2">
                <span className="font-light text-custom-grey">Nombre:</span>
                <p>{dataUser.name + dataUser.surname}</p>
              </div>
              <div className="w-1/2">
                <span className="font-light text-custom-grey">Email:</span>
                <p>{dataUser.email}</p>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col sm:gap-0 gap-2 text-start">
              <div className="w-1/2">
                <span className="font-light text-custom-grey">
                  Estado de cuenta:
                </span>
                <p className="text-green-600 capitalize">{dataUser.status}</p>
              </div>
              <div className="w-1/2">
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
