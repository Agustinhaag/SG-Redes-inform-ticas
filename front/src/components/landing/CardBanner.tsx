import React from "react";
import { BannerProps } from "@/helpers/types";
import Link from "next/link";
import PATHROUTES from "@/helpers/PathRoutes";

const CardBanner: React.FC<BannerProps> = ({ img, text, title }) => {
  return (
    <div
      className="proyecto-banner h-full bg-cover pl-6 sm:pl-2"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="info-proyecto flex flex-col justify-center h-5/6 w-11/12 mx-auto p-2.5 gap-5 text-custom-white">
        <h4 className="sm:text-4xl text-3xl font-bold">{title}</h4>
        <p className="text-custom-white font-light mb-5">{text}</p>
        <div>
          <Link
            href={PATHROUTES.SERVICES}
            className="border border-custom-blue font-medium py-2 px-5 rounded-md bg-none text-custom-blue text-xs sm:text-sm hover:bg-custom-blue hover:text-custom-white"
          >
            Servicios
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardBanner;
