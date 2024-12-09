"use client";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CardBanner from "./CardBanner";
import useHorizontalScroll from "@/helpers/scrollCarrusel";

const Banner: React.FC = () => {
  const { containerRef, scrollRight, scrollLeft } = useHorizontalScroll();

  return (
    <div className="flex items-center w-full relative">
      <button
        onClick={scrollLeft}
        className="flecha-izquierda text-black absolute left-1 bg-neutral-300 hover:bg-custom-white p-2 rounded-full text-lg"
        style={{
          boxShadow: "0 0 6px rgba(0, 0, 0, 0.3)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <IoIosArrowBack />
      </button>
      <div
        ref={containerRef}
        className="contenedor-carrusel  w-full overflow-hidden scroll-smooth"
      >
        <div className="container-proyect  flex flex-nowrap h-96">
          <CardBanner
            img="/files/banner3.jpg"
            title="Nuevos productos todas los días"
            text="Contamos con excelente calidad y variedad al mejor precio."
          />
          <CardBanner
            img="/files/banner2.jpg"
            title="Envio gratis y 100% seguro"
            text="Si acumulas 2 o más productos te bonificamos el envio a cualquier punto del país."
          />
          <CardBanner
            img="/files/banner1.jpg"
            title="Todos los medios de pago disponibles"
            text="Paga en comodas cuotas, accesibles y con 0% interés."
          />
        </div>
      </div>
      <button
        onClick={scrollRight}
        className="flecha-derecha text-black absolute right-1 bg-neutral-300 hover:bg-custom-white p-2 rounded-full text-lg"
        style={{
          boxShadow: "0 0 6px rgba(0, 0, 0, 0.3)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Banner;
