import { campaignModel, userModel } from "../config/dataSource";
import { ClientError } from "../utils/errors";
import { StatusCampaign } from "../utils/types";
import { findUserById } from "./user.service";

export const fetchCampaignsByUser = async (userId: number) => {
  try {
    await findUserById(userId);
    const campaigns = await campaignModel.find({
      where: { user: { id: userId } },
      relations: ["messages"]
    });

    return campaigns;
  } catch (error) {
    console.error("Error al obtener las campañas:", error);
    throw new ClientError("No se pudieron obtener las campañas.", 500);
  }
};

export const handleChangeStatus = async (id: string, status: string) => {
  try {
   
    const campaign = await campaignModel.findOneBy({ id: parseInt(id) });
    if (!campaign) {
      throw new ClientError("No existe la campaña");
    }
    if (status === "Finalizado") {
      campaign.status = StatusCampaign.FINISH;
    }
    if (status === "Cancelado") {
      campaign.status = StatusCampaign.CANCEL;
    }
    if (status === "Enviado a wablas") {
      campaign.status = StatusCampaign.SENDWABLAS;
    }
    await campaignModel.save(campaign);
    return campaign;
  } catch (error) {
    console.error("Error al obtener las campañas:", error);
    throw new ClientError("No se pudieron obtener las campañas.", 500);
  }
};
