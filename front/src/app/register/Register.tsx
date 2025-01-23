import RegisterForm from "@/components/forms/RegisterForm";
import PATHROUTES from "@/helpers/PathRoutes";
import Link from "next/link";
import React from "react";

const Register: React.FC = () => {
  return (
    <main className=" text-custom-white">
      <section className=" w-full flex">
        <div className="md:w-1/2 bg-black w-3/4 min-w-72 mx-auto my-3 bg-opacity-100 flex flex-col py-4">
          <div className="w-3/4 mx-auto">
            <h3 className="text-center text-custom-blue sm:text-3xl text-2xl font-semibold">
              Registro
            </h3>
           
            
            <RegisterForm />
            <p className="text-center sm:text-base text-xs">
              ¿Ya tienes una cuenta?
              <Link
                href={PATHROUTES.LOGIN}
                className="pl-1 text-custom-blue font-semibold hover:underline"
              >
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
