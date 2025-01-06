import { User } from "../entities/User";
import {
  factFetchLink,
  getUsersFromIspCubeService,
} from "../service/ispCube.service";

export const handleDataIspcube = async (tokenIspCube: string, user: User, usersIspCube:any[]) => {
    const invoices = usersIspCube.map(async (userIspCube) => {
        try {
            const data = await factFetchLink(tokenIspCube, user, userIspCube.id);
            return { userId: userIspCube.id, invoice: data };
        } catch (error) {
            console.log(error);
            return null;
        }
    });

    const resolvedInvoices = await Promise.all(invoices);

    const validInvoices = resolvedInvoices.filter(
        (item): item is { userId: any; invoice: string } => item !== null
    );

    const invoiceMap: Record<number, string> = {};
    validInvoices.forEach(({ userId, invoice }) => {
        invoiceMap[userId] = invoice;
    });

    return invoiceMap;
};


export const personalizeMessage = (
    template: string,
    user: any,
    invoiceMap: Record<number, string>
  ) => {
    return template
      .replace(/{{name}}/g, user.name)
      .replace(/{{debt}}/g, user.debt || "N/A")
      .replace(/{{address}}/g, user.address || "N/A")
      .replace(/{{plan_name}}/g, user.plan_name || "N/A")
      .replace(/{{invoices}}/g, invoiceMap[user.id] || "N/A");
  };
