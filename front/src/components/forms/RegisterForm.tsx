"use client";
import { handleSubmit } from "@/helpers/fetchFormLogin";
import PATHROUTES from "@/helpers/PathRoutes";
import { IUserRegister } from "@/helpers/types";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ContainerInput from "./ContainerInput";
import "../../styles/forms.css";
import ButtonLogin from "./ButtonLogin";
import { validarRegister } from "@/helpers/validateForms";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const url = process.env.NEXT_PUBLIC_URL;
    const dataUser = useSelector((state: any) => state.user.user);

  const handleSubmitRegister = async (values: IUserRegister) => {
    setLoading(true);
    try {
      const response = await handleSubmit({
        setError: setError,
        textError: "Error al registrar un usuario. Intentelo nuevamente.",
        textSwal: "Haz completado el registro correctamente!",
        titleSwal: "Registro exitoso",
        url: `${url}/auth/signup`,
        values,
      });
      if (response?.data.register) {
        router.push(PATHROUTES.LOGIN);
      } else {
        throw new Error("Error al crear un usuario");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError("Error al registrar un usuario. Inténtelo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
      if (dataUser ) {
        router.push(PATHROUTES.LANDING);
      }
    }, [dataUser]);

  return (
    <div className="cont-form">
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
          surname: "",
          phone: "",
        }}
        validate={validarRegister}
        onSubmit={async (values) => {
          try {
            await handleSubmitRegister(values);
            // console.log(values)
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {(formikProps) => (
          <Form className="flex flex-col items-start">
            <div className="flex gap-2 w-full">
              <ContainerInput
                error={error}
                formikProps={formikProps}
                nombre="name"
                title="Nombre"
                type="text"
              />
              <ContainerInput
                error={error}
                formikProps={formikProps}
                nombre="surname"
                title="Apellido"
                type="text"
              />
            </div>

            <ContainerInput
              error={error}
              formikProps={formikProps}
              nombre="email"
              title="Email"
              type="email"
            />

            <ContainerInput
              error={error}
              formikProps={formikProps}
              nombre="phone"
              title="Teléfono"
              type="text"
            />
            <ContainerInput
              error={error}
              formikProps={formikProps}
              nombre="password"
              title="Contraseña"
              type="password"
            />

            {error && (
              <p className="text-red-600 text-center mb-2 w-full">¡{error}!</p>
            )}
            <div className="cont-btn flex flex-col w-full justify-center mb-5">
              <ButtonLogin loading={loading} name="Registrar" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
