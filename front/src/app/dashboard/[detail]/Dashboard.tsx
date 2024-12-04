import InfoAccount from "@/components/dashboard/InfoAccount";
import AdminFunctions from "@/components/dashboard/AdminFunctions";
import UserLinks from "@/components/dashboard/UserLinks";
import PATHROUTES from "@/helpers/PathRoutes";
import Link from "next/link";
import React from "react";

const Dashboard: React.FC<{ params: { detail: string } }> = ({ params }) => {
  const { detail } = params;

  if (detail !== "user" && detail !== "admin") {
    return (
      <main>
        Parametro invalido.
        <Link
          href={`${PATHROUTES.DASHBOARD}/user`}
          className="bg-custom-red rounded font-semibold py-2 px-6 hover:bg-red-600 text-custom-white"
        >
          Volver al perfil
        </Link>
      </main>
    );
  }
  return (
    <main className="flex h-full md:flex-row flex-col w-11/12 mx-auto">
      <UserLinks />
      {detail === "user" && <InfoAccount />}
      {detail === "admin" && <AdminFunctions />}
    </main>
  );
};

export default Dashboard;
