"use client";
import React, { useState } from "react";
import ModalNewMessage from "./ModalNewMessage";
import ListMessages from "./ListMessages";
import { IUser, RootState } from "@/helpers/types";
import { useSelector } from "react-redux";

const ViewMessagesWablas: React.FC = () => {
  const [viewModalMessage, setViewModalMessage] = useState<boolean>(false);
  const toggleMenu = () => {
    setViewModalMessage(!viewModalMessage);
  };
  const dataUser: IUser = useSelector((state: RootState) => state.user.user);
  return (
    <section className="flex flex-col w-full px-3">
      {dataUser && dataUser.tokenwablas && dataUser.device ? (
        <>
          <div className="flex justify-between my-3 medium-xs:flex-row flex-col gap-3 xs:gap-0 w-full">
            <button
              className="bg-custom-blue medium-xs:mb-0 mb-2 h-12 medium-xs:w-auto w-2/3 min-w-44 text-white px-6 py-3 rounded-md hover:bg-blue-600"
              onClick={() => {
                setViewModalMessage(!viewModalMessage);
              }}
            >
              Enviar mensajes
            </button>
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
