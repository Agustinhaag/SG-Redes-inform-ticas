"use client";
import React, { useState } from "react";
import ModalNewMessage from "./ModalNewMessage";

const ViewMessagesWablas: React.FC = () => {
  const [viewModalMessage, setViewModalMessage] = useState<boolean>(false);

  const toggleMenu = () => {
    setViewModalMessage(!viewModalMessage);
  };

  return (
    <section>
      <button
        onClick={() => {
          setViewModalMessage(!viewModalMessage);
        }}
      >
        Enviar mensajes
      </button>
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
