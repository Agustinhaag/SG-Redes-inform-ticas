"use client";
import React, { useEffect, useState } from "react";
import ModalNewMessage from "./ModalNewMessage";
import ListMessages from "./ListMessages";
import { Campaign, IUser, RootState } from "@/helpers/types";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { fetchInfoDevice } from "@/helpers/fetchDevice";

const ViewMessagesWablas: React.FC = () => {
  const [viewModalMessage, setViewModalMessage] = useState<boolean>(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const url = process.env.NEXT_PUBLIC_URL;
  const token = Cookies.get("token");
  const [deviceStatus, setDeviceStatus] = useState<string>();
  const toggleMenu = () => {
    setViewModalMessage(!viewModalMessage);
  };
  const dataUser: IUser = useSelector((state: RootState) => state.user.user);
  const handleNewCampaign = (newCampaign: any) => {
    setCampaigns((prevCampaigns) => [newCampaign, ...prevCampaigns]);
  };
  useEffect(() => {
    if (dataUser && dataUser.id) {
      fetchInfoDevice(dataUser.id, url!, token!)
        .then((res) => {
          if (res) {
            setDeviceStatus(res.data.status);
          }
        })
        .catch((err) => {
          console.error("Error al obtener el estado del dispositivo:", err);
        });
    }
  }, [dataUser && dataUser.id]);
  return (
    <section className="flex flex-col w-full px-3">
      {dataUser &&
      dataUser.tokenwablas &&
      dataUser.device &&
      deviceStatus === "connected" ? (
        <>
          <div className="flex justify-between my-3 medium-xs:flex-row flex-col gap-3 xs:gap-0 w-full">
            {dataUser.status === "suspended" ? (
              <p>Su cuenta está suspendida. Por favor, comuníquese para más información.</p>
            ) : (
              <button
                className="bg-custom-blue medium-xs:mb-0 mb-2 h-12 medium-xs:w-auto w-2/3 min-w-44 text-white px-6 py-3 rounded-md hover:bg-blue-600"
                onClick={() => {
                  setViewModalMessage(!viewModalMessage);
                }}
              >
                Crear mensajes
              </button>
            )}
          </div>
          <ListMessages campaigns={campaigns} setCampaigns={setCampaigns} />
          {viewModalMessage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-55 z-40"
              onClick={toggleMenu}
            ></div>
          )}
          <ModalNewMessage
            setViewModalMessage={setViewModalMessage}
            viewModalMessage={viewModalMessage}
            onNewCampaign={handleNewCampaign}
          />
        </>
      ) : (
        <div className="text-custom-white">
          <p>Su dispositivo aún no esta disponible para el envio de mensajes</p>
          <p>Por favor comuniquese con nuestro equipo</p>
        </div>
      )}
    </section>
  );
};

export default ViewMessagesWablas;
