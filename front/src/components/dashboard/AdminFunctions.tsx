"use client";

import { fetchAllUsers } from "@/helpers/fetchAdminFunctions";
import { IUser } from "@/helpers/types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
import CardUsers from "./CardUsers";

const AdminFunctions: React.FC = () => {
  const url = process.env.NEXT_PUBLIC_URL!;
  const token: string = useSelector((state: any) => state.user.token);
  const [users, setUsers] = useState<IUser[] | null>(null);

  useEffect(() => {
    fetchAllUsers(url, token).then((res) => {
      setUsers(res);
    });
  }, [url, token]);
  if (users === null) {
    return <Spinner title="Cargando usuarios..." />;
  }

  return (
    <div className="text-custom-white">
      <h2>Lista de usuarios</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <CardUsers user={user} key={user.id} />
          ))}
        </ul>
      ) : (
        <p>No se encontraron usuarios.</p>
      )}
    </div>
  );
};

export default AdminFunctions;
