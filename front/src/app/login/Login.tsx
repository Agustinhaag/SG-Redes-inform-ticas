import LoginForm from "@/components/forms/LoginForm";
import PATHROUTES from "@/helpers/PathRoutes";
import Link from "next/link";
import React from "react";

const Login: React.FC = () => {
  return (
    <main className=" text-custom-white">
      <section className=" w-full flex">
        <div className="md:w-1/2 w-3/4 min-w-72 mx-auto bg-black my-3 bg-opacity-100 flex flex-col py-4">
          <div className="w-3/4 mx-auto">
            <h3 className="text-center text-custom-blue sm:text-3xl text-xl font-semibold">
              ¡Bienvenido!
            </h3>
         
            <LoginForm />
            <p className="text-center sm:text-base text-xs">
              ¿Aún no tienes una cuenta?
              <Link
                href={PATHROUTES.REGISTER}
                className="pl-1 text-custom-blue font-semibold hover:underline"
              >
                !Registrate¡
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
