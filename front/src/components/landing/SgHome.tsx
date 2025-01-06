"use client";
import React from "react";
import Image from "next/image";

const SgHome: React.FC = () => {
  return (
    <section className="flex flex-col gap-4  items-center justify-between text-white pb-8">
      <h1 className="sm:text-5xl xs:text-4xl text-3xl font-bold text-custom-blue ">
        SG-Redes informáticas
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
    </section>
  );
};

export default SgHome;
