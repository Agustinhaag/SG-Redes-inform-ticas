import { IMessageUser } from "@/helpers/types";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { LuCheckCheck } from "react-icons/lu";
import { MdCancel, MdPending, MdPhoneAndroid } from "react-icons/md";

const CardMessages: React.FC<{ message: IMessageUser }> = ({ message }) => {
  return (
    <div className="relative min-w-[270px] text-custom-white flex sm:w-full w-5/6 mx-auto bg-neutral-900 md:min-h-52 sm:h-64 h-52 bg-opacity-50 rounded-bl-3xl rounded-tr-3xl shadow-md  duration-300 ease-in-out transition-transform transform hover:scale-105">
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-custom-red"></div>
      <div className="flex-shrink-0 w-1/3 h-full relative overflow-hidden">
        <Image
          src="/files/chats4.jpg"
          alt={message.userName}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 rounded-bl-3xl bg-left"
        />
      </div>
      <div className="flex flex-col md:gap-5 gap-4 lg:ml-1 ml-2">
        <h2 className="flex items-center mt-3 gap-1 xs:text-base text-sm">
          <span className="text-custom-blue xs:text-lg text-base">
            <FaUser />
          </span>
          {message.userName}
        </h2>
        <p className="flex items-center gap-1 xs:text-base text-sm">
          <span className="text-custom-blue xs:text-lg text-base">
            <MdPhoneAndroid />
          </span>
          {message.phone.to}
        </p>
        <div className="flex md:flex-row sm:flex-col flex-row md:items-center sm:items-start items-center md:gap-6 sm:gap-3 gap-6">
          <p className="xs:text-base text-sm">
            Tipo: {message.category === "text" ? "Texto" : "Otro"}
          </p>

          <p className="flex items-center gap-1 xs:text-base text-sm">
            {message.status === "cancel" || message.status === "reject" ? (
              <>
                <MdCancel className="text-red-500" /> Cancelado
              </>
            ) : message.status === "pending" ? (
              <>
                <MdPending className="text-yellow-500" /> Pendiente
              </>
            ) : message.status === "read" ? (
              <>
                <LuCheckCheck  className="text-green-500" /> Leído
              </>
            ) : message.status === "delivered" ? (
              <>
                <LuCheckCheck  className="text-green-500" /> Entregado
              </>
            ) : message.status === "sent" ? (
              <>
                <FaCheckCircle className="text-green-500" /> Enviado
              </>
            ) : null}
          </p>
        </div>
        <div className="flex gap-3 md:flex-row sm:flex-col flex-row">
          <p className="flex items-center gap-1 xs:text-base text-sm">
            <span className="text-custom-blue xs:text-2xl  text-lg">
              <CiCalendarDate />
            </span>
            {dayjs(message.date.created_at).format("DD/MM/YY")}
          </p>
          <p className="flex items-center gap-1 xs:text-base text-sm">
            <span className="text-custom-blue xs:text-xl text-base">
              <IoMdTime />
            </span>
            {dayjs(message.date.created_at).format("HH:mm")} Hr.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardMessages;
