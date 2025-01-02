"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchAllMessages } from "@/helpers/fetchSendMessage";
import { useSelector } from "react-redux";
import { IMessageUser, IUser, RootState } from "@/helpers/types";
import CardMessages from "./CardMessages";
import { fetchAllUsersIspCube } from "@/helpers/fetchIspCube";
import Spinner from "../spinner/Spinner";

const ListMessages: React.FC = () => {
  const [messages, setMessages] = useState<IMessageUser[] | undefined>([]);
  const [messagesResponse, setMessagesResponse] = useState<any>();
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Nuevo estado para el Spinner
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
  const deliveredCount =
    messagesResponse &&
    messagesResponse.data.filter((msg: any) => msg.status === "delivered")
      .length;
  const pendingCount =
    messagesResponse &&
    messagesResponse.data.filter((msg: any) => msg.status !== "delivered")
      .length;

  return (
    <div className="flex flex-col w-full mb-2">
      <h2 className="text-xl mb-3">Mensajes enviados</h2>
      <div className="my-1">
        <p>
          <strong>Mensajes Enviados:</strong> {deliveredCount}
        </p>
        <p>
          <strong>Mensajes No Enviados:</strong> {pendingCount}
        </p>
      </div>
      {isLoading ? (
        <div className="flex justify-center w-full">
          <Spinner title="Cargando mensajes" />
        </div>
      ) : messages && messages.length > 0 ? (
        <div className="grid gap-6 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {messages.map((message: IMessageUser) => (
            <CardMessages message={message} key={message.id} />
          ))}
        </div>
      ) : (
        <p style={{ color: "#52525B" }}>No se encontraron mensajes.</p>
      )}
    </div>
  );
};

export default ListMessages;
