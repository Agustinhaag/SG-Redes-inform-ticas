import { Campaign, IUser, RootState } from "@/helpers/types";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaUser } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { IoTimeSharp } from "react-icons/io5";
import { LuCheckCheck } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import ModalCampaign from "./ModalCampaign";
import { fetchAllMessages } from "@/helpers/fetchSendMessage";
import Cookies from "js-cookie";
import { fetchAllUsersIspCube } from "@/helpers/fetchIspCube";
import { useSelector } from "react-redux";

const CardCampaign: React.FC<{ campaign: Campaign }> = ({ campaign }) => {
  const [viewModalCampaign, setViewModalCampaign] = useState<boolean>(false);
  const [usersWithIssues, setUsersWithIssues] = useState<any[]>([]);
  const dataUser: IUser = useSelector((state: RootState) => state.user.user);
  const token = Cookies.get("token");
  const tokenIspCube = Cookies.get("tokenIspCube");
  const url = process.env.NEXT_PUBLIC_URL;

  const toggleMenu = () => {
    setViewModalCampaign(!viewModalCampaign);
  };

  return (
    <div className="relative min-w-[270px] text-custom-white flex md:w-full w-11/12 mx-auto bg-neutral-900 md:min-h-52 sm:h-64 h-52 bg-opacity-50 pr-1 rounded-bl-3xl rounded-tr-3xl shadow-md">
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-custom-red"></div>
      <div className="flex-shrink-0 w-1/3 h-full relative overflow-hidden">
        <Image
          src="/files/chats4.jpg"
          alt="Proceso"
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
          Cantidad de usuarios: {campaign.recipients.length}
        </h2>

        <p className="flex items-center gap-1 xs:text-base text-sm">
          Estado:
          {campaign.status === "Cancelado" ? (
            <>
              <MdCancel className="text-red-500" /> Finalizado con fallos
            </>
          ) : campaign.status === "Procesando" ? (
            <>
              <IoTimeSharp className="text-yellow-500" /> Procesando
            </>
          ) : campaign.status === "Finalizado" ? (
            <>
              <LuCheckCheck className="text-green-500" /> Finalizado
              correctamente
            </>
          ) : campaign.status === "Enviado a wablas" ? (
            <>
              <LuCheckCheck className="text-green-500" /> Enviados a Wablas
            </>
          ) : null}
        </p>

        <div className="flex gap-3 md:flex-row sm:flex-col flex-row">
          <p className="flex items-center gap-1 xs:text-base text-sm">
            <span className="text-custom-blue xs:text-2xl text-lg">
              <CiCalendarDate />
            </span>
            {dayjs(campaign.createdAt).format("DD/MM/YY")}
          </p>
          <p className="flex items-center gap-1 xs:text-base text-sm">
            <span className="text-custom-blue xs:text-xl text-base">
              <IoMdTime />
            </span>
            {dayjs(campaign.createdAt).format("HH:mm")} Hr.
          </p>
        </div>
        <div className="flex justify-center">
          <button
            className="py-2 px-3 border border-custom-blue rounded-md hover:bg-custom-blue"
            onClick={() => setViewModalCampaign(!viewModalCampaign)}
          >
            Ver más
          </button>
        </div>
      </div>
      {viewModalCampaign && (
        <div
          className="fixed inset-0 bg-black bg-opacity-55 z-40"
          onClick={toggleMenu}
        ></div>
      )}
      <ModalCampaign
        setViewModalCampaign={setViewModalCampaign}
        viewModalCampaign={viewModalCampaign}
        campaign={campaign}
        usersWithIssues={usersWithIssues}
      />
    </div>
  );
};

export default CardCampaign;
