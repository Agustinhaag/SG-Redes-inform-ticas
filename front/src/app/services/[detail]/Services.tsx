import ViewMessagesWablas from "@/components/services/ViewMessagesWablas";
import PATHROUTES from "@/helpers/PathRoutes";
import Link from "next/link";
import React from "react";

const Services: React.FC<{ params: { detail: string } }> = ({ params }) => {
  const { detail } = params;

  if (detail !== "messages") {
    return (
      <main>
        Parametro invalido.
        <Link
          href={`${PATHROUTES.LANDING}`}
          className="bg-custom-red rounded font-semibold py-2 px-6 hover:bg-red-600 text-custom-white"
        >
          Volver al inicio
        </Link>
      </main>
    );
  }
  return (
    <main className="flex h-full md:flex-row flex-col w-11/12 mx-auto text-custom-white">
      {detail === "messages" && <ViewMessagesWablas />}
    </main>
  );
};

export default Services;
