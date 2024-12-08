"use client";
import React, { useState } from "react";
import ModalNewMessage from "./ModalNewMessage";
import ListMessages from "./ListMessages";
import Cookies from "js-cookie";
import { IUser } from "@/helpers/types";
import { useSelector } from "react-redux";
import { fetchScanQrCode } from "@/helpers/fetchSendMessage";
import style from "../forms/button.module.css";
const ViewMessagesWablas: React.FC = () => {
  const [viewModalMessage, setViewModalMessage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dataUser: IUser = useSelector((state: any) => state.user.user);
  const url = process.env.NEXT_PUBLIC_URL;
  const token = Cookies.get("token");
  const toggleMenu = () => {
    setViewModalMessage(!viewModalMessage);
  };

  return (
    <section className="flex flex-col w-11/12 mx-auto">
      <div className="flex justify-between my-3 xs:flex-row flex-col gap-3 xs:gap-0">
        <button
          className="bg-custom-blue xs:w-auto w-2/3 min-w-44 text-white px-6 py-3 rounded-md hover:bg-blue-600"
          onClick={() => {
            setViewModalMessage(!viewModalMessage);
          }}
        >
          Enviar mensajes
        </button>
        {dataUser && dataUser.tokenwablas && (
          <button
            className="border-2 xs:w-auto w-2/3 min-w-44 border-custom-blue rounded-md px-6 py-2.5 hover:bg-custom-blue text-custom-white"
            onClick={async () =>
              await fetchScanQrCode(url!, token!, dataUser.id, setLoading)
            }
          >
            {loading ? <span className={style.loader}></span> : "Generar QR"}
          </button>
        )}
      </div>
      <ListMessages />
      {viewModalMessage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-55 z-40"
          onClick={toggleMenu}
        ></div>
      )}
      <ModalNewMessage
        setViewModalMessage={setViewModalMessage}
        viewModalMessage={viewModalMessage}
      />
    </section>
  );
};

export default ViewMessagesWablas;
