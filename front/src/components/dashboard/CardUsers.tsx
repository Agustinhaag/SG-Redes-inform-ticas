import { activateUser } from "@/helpers/fetchAdminFunctions";
import { IUser, RootState } from "@/helpers/types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ModalNewToken from "./ModalNewToken";
import { RiShieldUserFill } from "react-icons/ri";

const CardUsers: React.FC<{ user: IUser; onChangeState: () => void }> = ({
  user,
  onChangeState,
}) => {
  const url = process.env.NEXT_PUBLIC_URL!;
  const token: string = useSelector((state: RootState) => state.user.token);
  const [viewModalToken, setViewModalToken] = useState<boolean>(false);
  const handleToggleState = async () => {
    const success = await activateUser(url!, token!, user.id);
    if (success) {
      onChangeState();
    }
  };

  const namesArray = user.name.split(" ");
  const surnamesArray = user.surname.split(" ");

  const firstName = namesArray[0];
  const firstSurname = surnamesArray[0];

  return (
    <div
      className={`flex xs:flex-row flex-col lg:gap-5 md:gap-3 ${
        user.tokenwablas ? "sm:gap-12 gap-7" : "gap-2"
      } items-center px-3 py-6 bg-black bg-opacity-50 rounded `}
    >
      <p className="sm:block hidden text-2xl">
        <RiShieldUserFill />
      </p>
      <div
        className={`flex ${
          user.tokenwablas
            ? "sm:gap-12 medium-xs:gap-7 gap-4 medium-xs:w-auto w-3/4"
            : "gap-4 "
        } medium-xs:flex-row flex-col`}
      >
        <p className="flex gap-1">
          <span className="capitalize">{firstName}</span>
          <span className="capitalize">{firstSurname}</span>
        </p>
        <p>+{user.device}</p>

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

      <div className={`flex gap-8 medium-xs:flex-row flex-col `}>
        <button
          className={`rounded-md p-2 text-custom-white ${
            user.status !== "active"
              ? "bg-green-600 hover:bg-green-500"
              : "bg-red-600 hover:bg-red-500"
          }`}
          onClick={handleToggleState}
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
        onChangeState={onChangeState}
      />
    </div>
  );
};

export default CardUsers;
