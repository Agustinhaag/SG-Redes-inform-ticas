import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { InputProps } from "@/helpers/types";
import ModalResetPasswordInit from "./ModalResetPasswordInit";

const ContainerInput: React.FC<InputProps> = ({
  nombre,
  title,
  type,
  formikProps,
  error,
  textarea = false,
  recoveryPass = false,
  contact = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [viewResetPassword, setViewResetPassword] = useState<boolean>(false);

  const toggleMenu = () => {
    setViewResetPassword(!viewResetPassword);
  };

  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="w-full">
      <div className="cont-input">
        <Field
          as={textarea ? "textarea" : "input"}
          type={inputType}
          name={nombre}
          className={`${
            (formikProps.errors[nombre] && formikProps.touched[nombre]) || error
              ? "error"
              : ""
          } ${contact ? "input-contact" : "input"}  ${
            textarea && "resize-none min-h-52"
          }`}
          placeholder=" "
        />
        <label
          htmlFor={nombre}
          className={`label 
            ${
              (formikProps.errors[nombre] && formikProps.touched[nombre]) ||
              error
                ? "errorLabel"
                : ""
            } 
            ${textarea ? (contact ? "text-black" : "text-gray-400") : ""}`}
          style={{
            top: textarea ? "20%": "50%",
            transform: "translateY(-50%)",
            transition: ".4s",
          }}
        >
          {title}
        </label>
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute sm:text-base text-sm sm:top-5 top-[13px] right-4"
          >
            {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
      {recoveryPass && (
        <button
          type="button"
          onClick={() => setViewResetPassword(!viewResetPassword)}
          className="flex justify-end w-full pt-0.5 hover:underline"
        >
          ¿Olvidó su contraseña?
        </button>
      )}
      <span className="span" style={{ color: "red" }}>
        <ErrorMessage name={nombre} />
      </span>
      {viewResetPassword && (
        <div
          className="fixed inset-0 bg-black bg-opacity-55 z-40"
          onClick={toggleMenu}
        ></div>
      )}
      <ModalResetPasswordInit
        setViewResetPassword={setViewResetPassword}
        viewResetPassword={viewResetPassword}
      />
    </div>
  );
};

export default ContainerInput;
