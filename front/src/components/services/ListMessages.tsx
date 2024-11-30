"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchAllMessages } from "@/helpers/fetchSendMessage";
import { useSelector } from "react-redux";
import { IMessageUser } from "@/helpers/types";
import CardMessages from "./CardMessages";

const ListMessages: React.FC = () => {
  const [messages, setMessages] = useState<IMessageUser[] | undefined>([]);
  const users: any[] = useSelector((state: any) => state.ispCube.users);
  const url = process.env.NEXT_PUBLIC_URL;
  const token = Cookies.get("token");

  useEffect(() => {
    fetchAllMessages(token!, url!).then((res) => {
      if (users && users.length > 0) {
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
