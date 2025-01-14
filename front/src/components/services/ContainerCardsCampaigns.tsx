import { Campaign, IUser, RootState } from "@/helpers/types";
import React, { useEffect } from "react";
import Spinner from "../spinner/Spinner";
import {
  fetchAllMessages,
  updateCampaignStatus,
} from "@/helpers/fetchSendMessage";
import { fetchCampaign } from "@/helpers/fetchCampaign";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import CardCampaign from "./CardCampaign";
import { fetchAllUsersIspCube } from "@/helpers/fetchIspCube";

const ContainerCardsCampaigns: React.FC<{
  campaigns: Campaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
}> = ({ campaigns, setCampaigns }) => {
  const dataUser: IUser = useSelector((state: RootState) => state.user.user);
  const url = process.env.NEXT_PUBLIC_URL;
  const token = Cookies.get("token");
  const tokenIspCube = Cookies.get("tokenIspCube");

  useEffect(() => {
    const updateCampaignsStatus = async () => {
      try {
        const users = await fetchAllUsersIspCube(
          url!,
          dataUser.email,
          token!,
          tokenIspCube!
        );

        const processingCampaigns = campaigns.filter(
          (campaign) => campaign.status === "Enviado a wablas"
        );

        for (const campaign of processingCampaigns) {
          const messages = await fetchAllMessages(token!, url!, dataUser.id);

          if (!messages || !messages.data) continue;

          const relatedMessages = messages.data.filter((msg: any) =>
            campaign.messages[0].messageIds.includes(msg.id)
          );

          // Lógica actualizada para determinar el nuevo estado
          const allSentOrRead =
            relatedMessages.length > 0 &&
            relatedMessages.every(
              (msg: any) =>
                msg.status === "sent" ||
                msg.status === "read" ||
                msg.status === "read-self"
            );

          const hasFailedMessages = relatedMessages.some(
            (msg: any) =>
              msg.status === "cancel" ||
              msg.status === "reject" ||
              msg.status === "delivered"
          );

          let newStatus = campaign.status;

          if (allSentOrRead) {
            newStatus = "Finalizado";
          } else if (hasFailedMessages) {
            newStatus = "Cancelado";
          }

          // Actualizar estado si cambió
          if (newStatus !== campaign.status) {
            await updateCampaignStatus(url!, token!, campaign.id, newStatus);
          }
        }
      } catch (error) {
        console.error("Error updating campaigns:", error);
      }
    };
    updateCampaignsStatus();

    const interval = setInterval(() => {
      fetchCampaign(url!, token!, dataUser.id).then((res) => {
        setCampaigns(res);
      });
    }, 10000); // Actualiza cada 10 segundos

    return () => clearInterval(interval);
  }, [dataUser, token, url, campaigns.length]);

  if (campaigns === null) {
    return (
      <div className="flex justify-center w-full">
        <Spinner title="Cargando procesos" />
      </div>
    );
  }

  return (
    <div>
      <h2>Procesos:</h2>
      {campaigns && campaigns.length > 0 ? (
        <div className="grid mt-3 gap-4 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => {
            return <CardCampaign campaign={campaign} key={campaign.id} />;
          })}
        </div>
      ) : (
        <p>No posee procesos actualmente.</p>
      )}
    </div>
  );
};

export default ContainerCardsCampaigns;
