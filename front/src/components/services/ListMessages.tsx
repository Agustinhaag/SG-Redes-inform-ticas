"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchAllMessages } from "@/helpers/fetchSendMessage";
import { useSelector } from "react-redux";
import { IMessageUser, IUser } from "@/helpers/types";
import CardMessages from "./CardMessages";
import { fetchAllUsersIspCube } from "@/helpers/fetchIspCube";

const ListMessages: React.FC = () => {
  const [messages, setMessages] = useState<IMessageUser[] | undefined>([]);
  const dataUser: IUser = useSelector((state: any) => state.user.user);
  const [users, setUsers] = useState<any[]>([]);
  const url = process.env.NEXT_PUBLIC_URL;
  const token = Cookies.get("token");
  const tokenIspCube: string = useSelector(
    (state: any) => state.user.tokenIspCube
  );

  useEffect(() => {
    if (dataUser) {
      fetchAllUsersIspCube(url!, dataUser.email, token!, tokenIspCube!).then(
        (res) => {
          setUsers(res);
        }
      );

      fetchAllMessages(token!, url!, dataUser.id).then((res) => {
        if (users && users.length > 0 && res.data) {
          const dataMessage: IMessageUser[] | undefined = res.data.map(
            (message: any) => {
              const targetPhone = message.phone?.to;

              const user = users.find(
                (user) => user.phones[0]?.number === targetPhone
              );
              return {
                ...message,
                userName: user?.name || "Usuario no encontrado",
              };
            }
          );
          setMessages(dataMessage);
        }
      });
    }
  }, [users.length]);

  return (
    <div>
      <h2>Mensajes enviados</h2>
      {messages &&
        messages.map((message: IMessageUser) => (
          <CardMessages message={message} key={message.id} />
        ))}
    </div>
  );
};

export default ListMessages;
