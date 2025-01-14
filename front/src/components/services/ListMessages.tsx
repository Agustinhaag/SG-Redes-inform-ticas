"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchAllMessages } from "@/helpers/fetchSendMessage";
import { useSelector } from "react-redux";
import { Campaign, IUser, RootState } from "@/helpers/types";
import { fetchCampaign } from "@/helpers/fetchCampaign";
import ContainerCardsCampaigns from "./ContainerCardsCampaigns";

const ListMessages: React.FC<{
  campaigns: Campaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
}> = ({ campaigns, setCampaigns }) => {
  const dataUser: IUser = useSelector((state: RootState) => state.user.user);
  const url = process.env.NEXT_PUBLIC_URL;
  const token = Cookies.get("token");
  const [messagesResponse, setMessagesResponse] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (dataUser) {
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

    fetchCampaign(url!, token!, dataUser.id).then((res) => {
      setCampaigns(res);
    });

    fetchData();
  }, [dataUser, token, url, campaigns.length]);

  const deliveredCount =
    messagesResponse &&
    messagesResponse.data &&
    messagesResponse.data.filter(
      (msg: any) =>
        msg.status === "sent" ||
        msg.status === "read" ||
        msg.status === "read-self"
    ).length;

  const pending =
    messagesResponse &&
    messagesResponse.data &&
    messagesResponse.data.filter((msg: any) => msg.status === "pending").length;

  const NoDeliveredCount =
    messagesResponse &&
    messagesResponse.data &&
    messagesResponse.data.filter(
      (msg: any) =>
        msg.status === "cancel" ||
        msg.status === "reject" ||
        msg.status === "delivered"
    ).length;

  return (
    <div className="flex flex-col w-full mb-2">
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
      <ContainerCardsCampaigns
        campaigns={campaigns}
        setCampaigns={setCampaigns}
      />
    </div>
  );
};

export default ListMessages;
