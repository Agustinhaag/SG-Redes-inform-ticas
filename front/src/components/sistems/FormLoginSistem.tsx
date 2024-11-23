"use client";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import ContainerInput from "../forms/ContainerInput";
import ButtonLogin from "../forms/ButtonLogin";
import { useRouter } from "next/navigation";
import { validateLoginIspCube } from "@/helpers/validateForms";
import Cookies from "js-cookie";
import { handleSubmitIpsCube } from "@/helpers/fetchFormLogin";
import { IUser, IUserIspCube } from "@/helpers/types";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/forms.css";
import { setTokenIspCube } from "@/redux/userSlice";
import PATHROUTES from "@/helpers/PathRoutes";
import { fetchUsersIspCube } from "@/helpers/ispCubeActions";
import { AppDispatch } from "@/redux/store";

const FormLoginSistem: React.FC<{
  setViewModalSistem: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setViewModalSistem }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const url = process.env.NEXT_PUBLIC_URL;
  const token = Cookies.get("token");
  const dataUser: IUser = useSelector((state: any) => state.user.user);
  const dispatch: AppDispatch = useDispatch();

  const handleLoginIspCube = async (values: IUserIspCube) => {
    try {
      setLoading(true);
      const response = await handleSubmitIpsCube(
        setError,
        token!,
        dataUser.email,
        url!,
        values
      );
      if (response?.response.ok) {
        dispatch(
          fetchUsersIspCube(
            url!,
            dataUser && dataUser.email,
            token!,
            response.data.token.token!
          )
        );
        dispatch(setTokenIspCube(response.data.token.token));
        setLoading(false);
        setViewModalSistem(false);
        router.push(`${PATHROUTES.SERVICES}/users`);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        passwordIspCube: "",
        clientId: "",
        apiKey: "",
      }}
      validate={validateLoginIspCube}
      onSubmit={async (values) => {
        try {
          await handleLoginIspCube(values);
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
            nombre="username"
            title="Usuario"
            type="text"
          />
          <ContainerInput
            error={error}
            formikProps={formikProps}
            nombre="apiKey"
            title="Api-key"
            type="text"
          />
          <ContainerInput
            error={error}
            formikProps={formikProps}
            nombre="clientId"
            title="Id Cliente"
            type="text"
          />
          <ContainerInput
            error={error}
            formikProps={formikProps}
            nombre="passwordIspCube"
            title="Contraseña"
            type="password"
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
  );
};

export default FormLoginSistem;
