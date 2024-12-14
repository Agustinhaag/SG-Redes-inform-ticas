"use client";
import ModalSelectSistem from "@/components/sistems/ModalSelectSistem";
import Image from "next/image";
import React, { useState } from "react";

const CardSistem: React.FC<{ name: string; img: string }> = ({ img, name }) => {
  const [viewModalSistem, setViewModalSistem] = useState<boolean>(false);

  const toggleMenu = () => {
    setViewModalSistem(!viewModalSistem);
  };

  return (
    <>
      <div className=" flex items-center flex-col bg-opacity-30 shadow-md overflow-hidden  duration-300 ease-in-out transition-transform transform hover:scale-105 border-custom-blue border-2 p-3 md:w-1/5 medium-xs:w-1/3 w-1/2 min-w-44 h-56 rounded-bl-3xl rounded-tr-3xl">
        <Image alt={name} src={img} width={80} height={80} className="mt-1" />
        <p className="my-5 text-lg">IspCube</p>
        <button
          className="bg-custom-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => {
            setViewModalSistem(!viewModalSistem);
          }}
        >
          Seleccionar
        </button>
      </div>
      {viewModalSistem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-55 z-50"
          onClick={toggleMenu}
        ></div>
      )}
      <ModalSelectSistem
        setViewModalSistem={setViewModalSistem}
        viewModalSistem={viewModalSistem}
        nameSistem={name}
      />
    </>
  );
};

export default CardSistem;
