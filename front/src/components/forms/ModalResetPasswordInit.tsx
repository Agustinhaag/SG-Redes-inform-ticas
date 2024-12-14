"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import "../../styles/modalResetPassword.css";
import FormModalResetPassword from "./FormModalResetPassword";

const ModalResetPasswordInit: React.FC<{
  viewResetPassword: boolean;
  setViewResetPassword: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ viewResetPassword, setViewResetPassword }) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  return (
    <CSSTransition
      in={viewResetPassword}
      timeout={900}
      classNames="modal"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className="modal-overlay  z-50">
        <div
          className="modal-content"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.6) 0px 10px 30px 0px",

            maxHeight: "85vh",
          }}
        >
          <div className=" flex items-center mb-5 pb-5 border-b border-custom-grey w-full">
            <h3 className="font-semibold sm:text-2xl text-xl">
              Recuperar contraseña
            </h3>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setViewResetPassword(false);
            }}
            type="button"
            className="absolute top-5 right-5 py-1 px-1.5 transition-all  border-2 border-custom-blue bg-transparent rounded-md hover:bg-custom-blue text-custom-white hover:cursor-pointer"
          >
            <IoMdClose />
          </button>
          <div>
            <h3 className="sm:text-xl text-base font-light">
              Por favor ingrese el email de registro
            </h3>
            <p className="text-sm my-2">
              Le enviaremos un correo con un enlace temporal para recuperar su
              contraseña
            </p>
            <FormModalResetPassword
              setViewResetPassword={setViewResetPassword}
            />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ModalResetPasswordInit;
