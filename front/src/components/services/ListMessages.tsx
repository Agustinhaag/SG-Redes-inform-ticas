"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchAllMessages } from "@/helpers/fetchSendMessage";
import { useSelector } from "react-redux";
import { IMessageUser, IUser } from "@/helpers/types";
import CardMessages from "./CardMessages";
import { fetchAllUsersIspCube } from "@/helpers/fetchIspCube";
import Spinner from "../spinner/Spinner";

const ListMessages: React.FC = () => {
  const [messages, setMessages] = useState<IMessageUser[] | undefined>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Nuevo estado para el Spinner
  const dataUser: IUser = useSelector((state: any) => state.user.user);
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

          if (
            usersResponse &&
            usersResponse.length > 0 &&
            messagesResponse.data
          ) {
            const dataMessage: IMessageUser[] | undefined =
              messagesResponse.data.map((message: any) => {
                const targetPhone = message.phone?.to;
                const user = usersResponse.find(
                  (user: any) => user.phones[0]?.number === targetPhone
                );
                return {
                  ...message,
                  userName: user?.name || "Desconocido",
                };
              });
            setMessages(dataMessage);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Desactiva el Spinner al terminar
      }
    };

    fetchData();
  }, [dataUser, token, tokenIspCube, url]);

  return (
    <div className="flex flex-col">
      <h2 className="text-xl mb-3">Mensajes enviados</h2>
      <div className="grid gap-6 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="flex justify-center w-full">
            <Spinner title="Cargando usuarios" />
          </div>
        ) : messages && messages.length > 0 ? (
          messages.map((message: IMessageUser) => (
            <CardMessages message={message} key={message.id} />
          ))
        ) : (
          <p style={{ color: "#52525B" }}>No se encontraron mensajes.</p>
        )}
      </div>
    </div>
  );
};

export default ListMessages;
