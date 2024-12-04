import { IUser } from "@/helpers/types";
import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import ContainerInput from "../forms/ContainerInput";
import { Form, Formik } from "formik";
import ButtonLogin from "../forms/ButtonLogin";
import { validateNewToken } from "@/helpers/validateForms";
import "../../styles/modalResetPassword.css";
import "../../styles/forms.css";
import { addToken } from "@/helpers/fetchAdminFunctions";
import { useSelector } from "react-redux";

const ModalNewToken: React.FC<{
  setViewModalToken: React.Dispatch<React.SetStateAction<boolean>>;
  viewModalToken: boolean;
  user: IUser;
}> = ({ setViewModalToken, viewModalToken, user }) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const url = process.env.NEXT_PUBLIC_URL!;
  const token: string = useSelector((state: any) => state.user.token);

  const handleAddToken = async (values: any) => {
    try {
      const response = await addToken(
        url!,
        token!,
        values.apikey,
        user.id,
        setError
      );
      if (response || response === false) {
        setViewModalToken(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CSSTransition
      in={viewModalToken}
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
            <h3 className="font-semibold text-2xl">
              Añadir ApiKey Wablas al usuario: {user.name}
            </h3>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setViewModalToken(false);
            }}
            type="button"
            className="absolute top-5 right-5 py-1 px-1.5 transition-all  border-2 border-custom-blue bg-transparent rounded-md hover:bg-custom-blue text-custom-white hover:cursor-pointer"
          >
            <IoMdClose />
          </button>
          <div>
            <Formik
              initialValues={{
                apikey: "",
              }}
              validate={validateNewToken}
              onSubmit={async (values) => {
                await handleAddToken(values);
              }}
            >
              {(formikProps) => (
                <Form className="flex flex-col items-start">
                  <ContainerInput
                    error={error}
                    formikProps={formikProps}
                    nombre="apikey"
                    title="Api-Key"
                    type="password"
                  />

                  {error && (
                    <p className="text-red-600 text-center mb-2 w-full">
                      ¡{error}!
                    </p>
                  )}
                  <div className="cont-btn flex flex-col w-full justify-center mb-5">
                    <ButtonLogin loading={loading} name="Agregar" />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ModalNewToken;
