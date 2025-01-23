import { IUser, RootState } from "@/helpers/types";
import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import ContainerInput from "../forms/ContainerInput";
import { Form, Formik } from "formik";
import ButtonLogin from "../forms/ButtonLogin";
import { validateDevice } from "@/helpers/validateForms";
import "../../styles/modalResetPassword.css";
import "../../styles/forms.css";

import { useDispatch, useSelector } from "react-redux";
import { sendDevice } from "@/helpers/fetchDevice";
import { fetchDataUser } from "@/helpers/fetchDataUser";
import { AppDispatch } from "@/redux/store";
import { setUserData } from "@/redux/userSlice";

const ModalDevice: React.FC<{
  setViewModalDevice: React.Dispatch<React.SetStateAction<boolean>>;
  viewModalDevice: boolean;
}> = ({ setViewModalDevice, viewModalDevice }) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const url = process.env.NEXT_PUBLIC_URL!;
  const dataUser: IUser = useSelector((state: RootState) => state.user.user);
  const token: string = useSelector((state: RootState) => state.user.token);
  const secret = process.env.NEXT_PUBLIC_SECRET;
  const dispatch: AppDispatch = useDispatch();

  const handleAddDevice = async (device: string) => {
    try {
      setLoading(true);
      const response = await sendDevice(
        url,
        token,
        device,
        dataUser.id,
        setError,
        setLoading,
        setViewModalDevice
      );

      if ((response.message = "Dispositivo guardado correctamente")) {
        await dispatch(setUserData(response.user));
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <CSSTransition
      in={viewModalDevice}
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
          <div className=" flex gap-1 mb-5 pb-5 border-b text-custom-white items-start flex-col border-custom-grey w-full">
            <h3 className="font-semibold sm:text-xl xs:text-base text-sm text-custom-white">
              Añadir dispositivo
            </h3>
            <small>
              Formato: código pais + Indicador de celular + código de area +
              número de teléfono
            </small>
            <small className="flex ">
              Ejemplo para Argentina: <span className="text-red-500 ml-1">54</span>
              <span className="text-violet-900">9</span>
              <span className="text-green-600">343</span>4151061
            </small>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setViewModalDevice(false);
            }}
            type="button"
            className="absolute top-5 right-5 py-1 px-1.5 transition-all  border-2 border-custom-blue bg-transparent rounded-md hover:bg-custom-blue text-custom-white hover:cursor-pointer"
          >
            <IoMdClose />
          </button>
          <div>
            <Formik
              initialValues={{
                device: "",
              }}
              validate={validateDevice}
              onSubmit={async (values) => {
                await handleAddDevice(values.device);
              }}
            >
              {(formikProps) => (
                <Form className="flex flex-col items-start gap-3 text-custom-white">
                  <ContainerInput
                    error={error}
                    formikProps={formikProps}
                    nombre="device"
                    title="N° teléfono"
                    type="text"
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

export default ModalDevice;
