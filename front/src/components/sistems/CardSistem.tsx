"use client";
import ModalSelectSistem from "@/components/sistems/ModalSelectSistem";
import Image from "next/image";
import React, { useState } from "react";

const CardSistem: React.FC<{name:string, img:string}> = ({img,name}) => {
  const [viewModalSistem, setViewModalSistem] = useState<boolean>(false);

  const toggleMenu = () => {
    setViewModalSistem(!viewModalSistem);
  };

  return (
    <div>
      <Image alt={name} src={img} width={80} height={80} />
      <p>IspCube</p>
      <button
        onClick={() => {
          setViewModalSistem(!viewModalSistem);
        }}
      >
        Seleccionar
      </button>
      {viewModalSistem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-55 z-40"
          onClick={toggleMenu}
        ></div>
      )}
      <ModalSelectSistem
        setViewModalSistem={setViewModalSistem}
        viewModalSistem={viewModalSistem}
        nameSistem={name}
      />
    </div>
  );
};

export default CardSistem;
