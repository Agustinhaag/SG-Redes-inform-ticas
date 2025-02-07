"use client";
import React, { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import "../../styles/modalResetPassword.css";
import FormLoginSistem from "./FormLoginSistem";

const ModalSelectSistem: React.FC<{
  viewModalSistem: boolean;
  setViewModalSistem: React.Dispatch<React.SetStateAction<boolean>>;
  nameSistem: string;
}> = ({ viewModalSistem, setViewModalSistem, nameSistem }) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  return (
    <CSSTransition
      in={viewModalSistem}
      timeout={900}
      classNames="modal"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className="modal-overlay  z-50">
        <div
          className="modal-content-sistem"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.6) 0px 10px 30px 0px",

            maxHeight: "85vh",
          }}
        >
          <div className=" flex items-center mb-5 pb-5 border-b border-custom-grey w-full">
            <h3 className="font-semibold md:text-2xl medium-xs:text-xl text-base">
              Integración de la API
            </h3>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setViewModalSistem(false);
            }}
            type="button"
            className="absolute top-5 right-5 py-1 px-1.5 transition-all  border-2 border-custom-blue bg-transparent rounded-md hover:bg-custom-blue text-custom-white hover:cursor-pointer"
          >
            <IoMdClose />
          </button>
          <div>
        

            <FormLoginSistem setViewModalSistem={setViewModalSistem} />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ModalSelectSistem;
