import { userModel } from "../config/dataSource";
import { User } from "../entities/User";
import { ClientError } from "../utils/errors";
import { Status } from "../utils/types";

export const toggleUserStatusService = async (
  userId: number
): Promise<string> => {
  try {
    const user = await userModel.findOne({ where: { id: userId } });

    if (!user) {
      throw new ClientError("Usuario no encontrado", 404);
    }

    // Alternar estado
    user.status =
      user.status === Status.ACTIVE ? Status.SUSPENDED : Status.ACTIVE;

    // Guardar cambios
    await userModel.save(user);

    return user.status;
  } catch (error) {
    throw new ClientError("No se pudo modificar el estado del usuario", 500);
  }
};

export const findAllUsers = async (): Promise<User[]> => {
  try {
    const users = await userModel.find();
    return users;
  } catch (error) {
    throw new ClientError(
      "No se pudo recuperar la informaciòn de todos los usuarios",
      500
    );
  }
};
