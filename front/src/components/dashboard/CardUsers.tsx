import { activateUser } from "@/helpers/fetchAdminFunctions";
import { IUser } from "@/helpers/types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ModalNewToken from "./ModalNewToken";

const CardUsers: React.FC<{ user: IUser }> = ({ user }) => {
  const url = process.env.NEXT_PUBLIC_URL!;
  const token: string = useSelector((state: any) => state.user.token);
  const [viewModalToken, setViewModalToken] = useState<boolean>(false);
  return (
    <div>
      <p>{user.name + user.surname}</p>
      <p>{user.phone}</p>
      <p>{user.email}</p>
      <p>{user.status}</p>
      <button onClick={async () => await activateUser(url!, token!, user.id)}>
        {user.status === "active" ? "Suspender" : "Activar"}
      </button>
      {!user.tokenwablas && (
        <button
          onClick={() => {
            setViewModalToken(!viewModalToken);
          }}
        >
          + Token
        </button>
      )}

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
