import React, { useRef, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import "../../styles/modalResetPassword.css";
import { Campaign } from "@/helpers/types";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import "../../styles/forms.css";
import { IUser, RootState } from "@/helpers/types";
import { fetchAllUsersIspCube } from "@/helpers/fetchIspCube";
import { fetchAllMessages } from "@/helpers/fetchSendMessage";
import dayjs from "dayjs";
import { IoTimeSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { LuCheckCheck } from "react-icons/lu";

const ModalCampaign: React.FC<{
  viewModalCampaign: boolean;
  setViewModalCampaign: React.Dispatch<React.SetStateAction<boolean>>;
  campaign: Campaign;
  usersWithIssues: string[];
}> = ({
  setViewModalCampaign,
  viewModalCampaign,
  campaign,
  usersWithIssues,
}) => {
  const url = process.env.NEXT_PUBLIC_URL;
  const token = Cookies.get("token");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const dataUser: IUser = useSelector((state: RootState) => state.user.user);
  const tokenIspCube: string = useSelector(
    (state: any) => state.user.tokenIspCube
  );
  const nodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Iniciar el estado de carga

      try {
        // Obtener datos de usuarios
        const allUsers = await fetchAllUsersIspCube(
          url!,
          dataUser.email,
          token!,
          tokenIspCube!
        );

        // Obtener mensajes de la campaña desde Wablas
        const messages = await fetchAllMessages(token!, url!, dataUser.id);

        if (!messages || !messages.data) {
          setLoading(false);
          return; // Si no hay mensajes, termina el proceso
        }

        // Filtrar los mensajes fallidos
        const failedNumbers = messages.data.filter(
          (msg: any) =>
            msg.status === "cancel" ||
            msg.status === "reject" ||
            msg.status === "delivered"
        );
        let relatedMessages: any;
        if (campaign.messages && campaign.messages[0]) {
          relatedMessages = failedNumbers.filter((msg: any) =>
            campaign.messages[0].messageIds.includes(msg.id)
          );
        }

        const usersFailds = allUsers.filter(
          (user: any) =>
            relatedMessages &&
            relatedMessages.some(
              (msg: any) => msg.phone.to === user.phones[0]?.number
            )
        );

        setUsers(usersFailds); // Establecer los usuarios fallidos
      } catch (error) {
        console.error("Error fetching data for modal:", error);
      } finally {
        setLoading(false); // Terminar el estado de carga
      }
    };

    fetchData();
  }, [ token, url, dataUser, tokenIspCube]);

  return (
    <CSSTransition
      in={viewModalCampaign}
      timeout={900}
      classNames="modal"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className="modal-overlay z-50">
        <div
          className="modal-content-message"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.6) 0px 10px 30px 0px",
            maxHeight: "85vh",
          }}
        >
          <div className="flex items-center mb-5 pb-5 border-b border-custom-grey w-full">
            <h3 className="font-semibold text-2xl">Detalle proceso</h3>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setViewModalCampaign(false);
            }}
            type="button"
            className="absolute top-5 right-5 py-1 px-1.5 transition-all border-2 border-custom-blue bg-transparent rounded-md hover:bg-custom-blue text-custom-white hover:cursor-pointer"
          >
            <IoMdClose />
          </button>
          <div className="flex flex-col gap-2">
            <p>Cantidad de usuarios: {campaign.recipients.length}</p>
            <p className="flex items-center gap-1 xs:text-base text-sm">
              Estado:
              {campaign.status === "Cancelado" ? (
                <>
                  <MdCancel className="text-red-500" /> Finalizado con fallos
                </>
              ) : campaign.status === "Procesando" ? (
                <>
                  <IoTimeSharp className="text-yellow-500" /> Procesando
                </>
              ) : campaign.status === "Finalizado" ? (
                <>
                  <LuCheckCheck className="text-green-500" /> Finalizado
                  correctamente
                </>
              ) : null}
            </p>
            <p>Mensaje: "{campaign.message}"</p>
            <p>Fecha: {dayjs(campaign.createdAt).format("DD/MM/YY HH:mm")} Hr.</p>

            <h4>Usuarios con fallos:</h4>
            {loading ? (
              <p>Cargando usuarios con fallos...</p> 
            ) : users.length > 0 && campaign.status !== "Enviado a wablas" ? (
              <ul className="pl-2">
                {users.map((user) => (
                  <li key={user.id}>{user.name || "Nombre desconocido"}</li>
                ))}
              </ul>
            ) : (
              <p className="pl-2">No se encontraron usuarios con fallos.</p>
            )}
<div className="flex justify-center ">

            <button  className="py-2 px-3 border border-custom-blue rounded-md hover:bg-custom-blue" onClick={() => setViewModalCampaign(false)}>Cerrar</button>
</div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ModalCampaign;
