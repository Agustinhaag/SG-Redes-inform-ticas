"use client";
import { fetchDataUser } from "@/helpers/fetchDataUser";
import { handleSubmit } from "@/helpers/fetchFormLogin";
import PATHROUTES from "@/helpers/PathRoutes";
import { IUserLogin, TokenProps } from "@/helpers/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ButtonLogin from "./ButtonLogin";
import ContainerInput from "./ContainerInput";
import { Form, Formik } from "formik";
import "../../styles/forms.css";
import { setToken, setUserData } from "@/redux/userSlice";
import { validarLogin } from "@/helpers/validateForms";


const LoginForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const secret = process.env.NEXT_PUBLIC_SECRET;
  const url = process.env.NEXT_PUBLIC_URL;

  const handleSubmitLogin = async (values: IUserLogin) => {
    setLoading(true);

    try {
      const response = await handleSubmit({
        setError: setError,
        textError: "Error al iniciar sesión. Intentelo nuevamente.",
        textSwal: "Haz completado el login correctamente!",
        titleSwal: "Inicio de sesión exitoso!",
        url: `${url}/auth/signin`,
        values: values,
      });

      if (response?.data.login) {
        const userData: TokenProps = {
          token: response.data.token,
        };

        dispatch(setToken(userData.token));
        fetchDataUser(userData.token, secret, url).then((res) => {
          dispatch(setUserData(res));
        });
        
        router.push(PATHROUTES.SISTEMS);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
      setError(
        error.message || "Error al iniciar sesión. Inténtelo nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cont-form pt-3">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={validarLogin}
        onSubmit={async (values) => {
          try {
            await handleSubmitLogin(values);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {(formikProps) => (
          <Form className="flex flex-col items-start">
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
              nombre="password"
              title="Contraseña"
              type="password"
              recoveryPass={true}
            />

            {error && (
              <p className="text-red-600 text-center mb-2 w-full">¡{error}!</p>
            )}
            <div className="cont-btn flex flex-col w-full justify-center mb-5">
              <ButtonLogin loading={loading} name="Ingresar" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
