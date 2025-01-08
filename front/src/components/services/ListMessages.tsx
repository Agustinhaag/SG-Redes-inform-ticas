"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchAllMessages } from "@/helpers/fetchSendMessage";
import { useSelector } from "react-redux";
import {  IUser, RootState } from "@/helpers/types";
import { fetchAllUsersIspCube } from "@/helpers/fetchIspCube";

const ListMessages: React.FC = () => {
  const [messagesResponse, setMessagesResponse] = useState<any>();
  const [users, setUsers] = useState<any[]>([]);
  const dataUser: IUser = useSelector((state: RootState) => state.user.user);
  const tokenIspCube: string = useSelector(
    (state: any) => state.user.tokenIspCube
  );
  const url = process.env.NEXT_PUBLIC_URL;
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (dataUser) {
          const usersResponse = await fetchAllUsersIspCube(
            url!,
            dataUser.email,
            token!,
            tokenIspCube!
          );
          setUsers(usersResponse);

          const messagesResponse = await fetchAllMessages(
            token!,
            url!,
            dataUser.id
          );
          setMessagesResponse(messagesResponse);
        
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } 
    };

    fetchData();
  }, [dataUser, token, tokenIspCube, url]);
  const deliveredCount =
    messagesResponse &&
    messagesResponse.data.filter(
      (msg: any) =>
        msg.status === "sent" ||
        msg.status === "read" ||
        msg.status === "delivered"
    ).length;

  const pending =
    messagesResponse &&
    messagesResponse.data.filter((msg: any) => msg.status === "pending").length;

  const NoDeliveredCount =
    messagesResponse &&
    messagesResponse.data.filter(
      (msg: any) => msg.status === "cancel" || msg.status === "reject"
    ).length;
  
  return (
    <div className="flex flex-col w-full mb-2">
      <h2 className="text-xl mb-3">Mensajes enviados</h2>
      <div className="sm:my-1 mb-2 flex justify-between sm:flex-row flex-col">
        <p>
          <strong>Mensajes Enviados:</strong> {deliveredCount}
        </p>
        <p>
          <strong>Mensajes pendientes:</strong> {pending}
        </p>
        <p>
          <strong>Mensajes No Enviados:</strong> {NoDeliveredCount}
        </p>
      </div>
      
    </div>
  );
};

export default ListMessages;
