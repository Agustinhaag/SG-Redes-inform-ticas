import React, { useState } from 'react'
import ButtonLogin from './forms/ButtonLogin';
import { Form, Formik } from 'formik';
import { validatePassword } from '@/helpers/validateForms';
import ContainerInput from './forms/ContainerInput';
import { fetchSendNewPassword } from '@/helpers/resetPassword';
import PATHROUTES from '@/helpers/PathRoutes';
import { useRouter } from 'next/navigation';
import "../styles/forms.css";

const FormResetPassword:React.FC<{token:string | null}> = ({ token}) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const url = process.env.NEXT_PUBLIC_URL;
    
  const handleSubmitNewPassword = async (password: string) => {
    const response = await fetchSendNewPassword(url!, password, token);
    if (response && response.ok) {
      router.push(PATHROUTES.LOGIN);
    }
  };
  return (
    <div>
    <h2>Ingrese una nueva contraseña</h2>
    <Formik
      initialValues={{
        password: "",
        repeatPassword: "",
      }}
      validate={validatePassword}
      onSubmit={async (values) => {
        try {
          await handleSubmitNewPassword(values.password);
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
            nombre="password"
            title="Contraseña"
            type="password"
          />

          <ContainerInput
            error={error}
            formikProps={formikProps}
            nombre="repeatPassword"
            title="Repita su contraseña"
            type="password"
          />

          {error && (
            <p className="text-red-600 text-center mb-2 w-full">
              ¡{error}!
            </p>
          )}
          <div className="cont-btn flex flex-col w-full justify-center mb-5">
            <ButtonLogin loading={loading} name="Reestablecer" />
          </div>
        </Form>
      )}
    </Formik>
  </div>
  )
}

export default FormResetPassword