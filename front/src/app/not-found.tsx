"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";

export const NotFoundPage: React.FC = () => {
  const [count, setCount] = useState<number>(5);
  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    // if (count === 0) {
    //   redirect("/");
    // }
    return () => clearInterval(interval);
  }, [count]);

  return (
    <main className="flex md:pt-10 pt-24 md:flex-row flex-col w-full h-full  items-center justify-between px-5 text-custom-white">
      <div className="flex flex-col md:pl-2 justify-center w-full md:w-2/4 pt-2 md:items-start items-center">
        <h1 className="font-semibold text-6xl md:text-8xl mb-4">¡Oops!</h1>
        <p className="text-2xl mt-3 mb-5">
          <span className="text-custom-blue font-bold text-3xl">404</span> -
          Page not found
        </p>
        <p className="text-custom-grey text-lg mb-5">
          Lo sentimos, la página que buscas no existe.
        </p>
        <p className="text-base">
          Sera redirijido/a al home en {count} segundos.
        </p>
      </div>
      <div className="w-1/2 min-w-72 flex justify-end">
        <Image
          loading="lazy"
          width={600}
          height={500}
          src="/files/404.jpg"
          alt="Page Not-Found"
        />
      </div>
      <div></div>
    </main>
  );
};

export default NotFoundPage;
