import { activateUser } from "@/helpers/fetchAdminFunctions";
import { IUser } from "@/helpers/types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ModalNewToken from "./ModalNewToken";
import { RiShieldUserFill } from "react-icons/ri";

const CardUsers: React.FC<{ user: IUser }> = ({ user }) => {
  const url = process.env.NEXT_PUBLIC_URL!;
  const token: string = useSelector((state: any) => state.user.token);
  const [viewModalToken, setViewModalToken] = useState<boolean>(false);
  return (
    <div className="flex lg:gap-5 md:gap-3 gap-2 items-center px-3 py-6 bg-black bg-opacity-50 rounded ">
      <p className="sm:block hidden text-2xl">
        <RiShieldUserFill />
      </p>
      <div className="flex gap-4 medium-xs:flex-row flex-col">
        <p className="flex gap-1">
          <span className="capitalize">{user.name}</span>
          <span className="capitalize">{user.surname}</span>
        </p>
        <p>+{user.phone}</p>

        <p className="md:min-w-[196px] lg:block medium-xs:hidden block">
          {user.email}
        </p>
        <p>
          {user.status === "suspended" ? (
            <span className="text-red-600">Suspendido</span>
          ) : (
            <span className="text-green-600">Activo</span>
          )}
        </p>
      </div>

      <div className="flex gap-8 medium-xs:flex-row flex-col ">
        <button
          className={`rounded-md p-2 text-custom-white ${
            user.status !== "active"
              ? "bg-green-600 hover:bg-green-500"
              : "bg-red-600 hover:bg-red-500"
          }`}
          onClick={async () => await activateUser(url!, token!, user.id)}
        >
          {user.status === "active" ? "Suspender" : "Activar"}
        </button>
        {!user.tokenwablas && (
          <button
            className=" min-w-[73px] rounded-md p-2 text-custom-white bg-blue-600 hover:bg-custom-blue"
            onClick={() => {
              setViewModalToken(!viewModalToken);
            }}
          >
            + Token
          </button>
        )}
      </div>

      {viewModalToken && (
        <div className="fixed inset-0 bg-black bg-opacity-55 z-40"></div>
      )}
      <ModalNewToken
        setViewModalToken={setViewModalToken}
        user={user}
        viewModalToken={viewModalToken}
      />
    </div>
  );
};

export default CardUsers;
