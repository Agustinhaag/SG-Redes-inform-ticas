"use client";
import React, { useState } from "react";
import ModalNewMessage from "./ModalNewMessage";
import ListMessages from "./ListMessages";
import Cookies from "js-cookie";
import { IUser, RootState } from "@/helpers/types";
import { useSelector } from "react-redux";
import { fetchScanQrCode } from "@/helpers/fetchSendMessage";
import style from "../forms/button.module.css";
import QRCodeGenerator from "./QrCodeGenerator";

const ViewMessagesWablas: React.FC = () => {
  const [viewModalMessage, setViewModalMessage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dataUser: IUser = useSelector((state: RootState) => state.user.user);
  const url = process.env.NEXT_PUBLIC_URL;
  const token = Cookies.get("token");
  const toggleMenu = () => {
    setViewModalMessage(!viewModalMessage);
  };

  return (
    <section className="flex flex-col w-full px-3">
      <div className="flex justify-between my-3 medium-xs:flex-row flex-col gap-3 xs:gap-0 w-full">
        <button
          className="bg-custom-blue medium-xs:mb-0 mb-2 h-12 medium-xs:w-auto w-2/3 min-w-44 text-white px-6 py-3 rounded-md hover:bg-blue-600"
          onClick={() => {
            setViewModalMessage(!viewModalMessage);
          }}
        >
          Enviar mensajes
        </button>
        {dataUser && dataUser.tokenwablas && (
          <>
            <QRCodeGenerator />
          </>
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
