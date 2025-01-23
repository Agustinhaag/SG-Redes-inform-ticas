"use client";
import React from "react";
import Image from "next/image";

const SgHome: React.FC = () => {
  return (
    <section className="flex flex-col gap-4  items-center justify-between text-white pb-8">
      <h1 className="sm:text-5xl xs:text-4xl text-3xl font-bold text-custom-blue ">
        SG-Software
      </h1>

      <div className="md:w-1/2 w-11/12 flex justify-center">
        <Image
          src="/files/home.jpg"
          alt="Técnicos trabajando"
          className="rounded-lg"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl text-center">¡Bienvenido!</h2>
        Para configurar el envío de mensajes masivos a sus clientes:
        <p>
          1) Ingrese al menú Sistemas para registrar el sistema de gestión
          utilizado en su empresa.
        </p>
        <p>
          2) Ingrese al menú Dispositivos para registrar el número de teléfono
          desde el cual se enviarán los mensajes masivos.
        </p>
      </div>
    </section>
  );
};

export default SgHome;
