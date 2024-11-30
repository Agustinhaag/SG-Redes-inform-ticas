import { IMessageUser } from "@/helpers/types";
import dayjs from "dayjs";
import React from "react";

const CardMessages: React.FC<{ message: IMessageUser }> = ({ message }) => {
  return (
    <div>
      <h2>{message.userName}</h2>
      <p>{message.phone.to}</p>
      <p>Tipo de mensaje: {message.category}</p>
      <p>{message.status === 'cancel' ? "Cancelado" : "Enviado"}</p>
      <p>Fecha: {dayjs(message.date.created_at).format("YYYY-MM-DD")}</p>
      <p>Hora: {dayjs(message.date.created_at).format("HH:mm:ss")}</p>
      <button>Ver más</button>
    </div>
  );
};

export default CardMessages;
