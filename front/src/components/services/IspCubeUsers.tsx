"use client";
import { fetchUsersIspCube } from "@/helpers/ispCubeActions";
import { AppDispatch } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { IUser } from "@/helpers/types";
import Spinner from "../spinner/Spinner";

const IspCubeUsers: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, loading, error } = useSelector((state: any) => state.ispCube);
  const dataUser: IUser = useSelector((state: any) => state.user.user);

  const url = process.env.NEXT_PUBLIC_URL;
  const token = Cookies.get("token");
  const tokenIspCube = Cookies.get("tokenIspCube");

  useEffect(() => {
    dispatch(
      fetchUsersIspCube(url!, dataUser && dataUser.email, token!, tokenIspCube!)
    );
  }, [dispatch]);

  console.log(users);
  if (users.length > 0) return <p>users</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <section>
      <Spinner title="Cargando usuarios..."/>
    </section>
  );
};

export default IspCubeUsers;
