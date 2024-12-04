import { User } from "../entities/User";
import {
  credentialModel,
  resetPassword,
  userModel,
} from "../config/dataSource";
import { ClientError } from "../utils/errors";
import RegisterUserDto from "../dtos/registerUserDto";
import {
  checkPasswordService,
  createCredentialService,
} from "./credential.service";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";
import LoginUserDto from "../dtos/loginUserDto";
import bcrypt from "bcryptjs";
import dayjs from "dayjs";
import { sendPasswordResetEmail } from "../helpers/sendEmailResetPassword";
import { decrypt, encrypt } from "../helpers/hashPropsHeader";
import { Role, Status } from "../utils/types";

export const checkUserExists = async (email: string): Promise<boolean> => {
  const user = await userModel.findOneBy({ email });
  return !!user;
};

export const registerUserService = async (
  registerUserDto: RegisterUserDto
): Promise<string> => {
  try {
    const user = userModel.create({
      ...registerUserDto,
      role: registerUserDto.role || Role.USER,
    });
    const credential = await createCredentialService({
      password: registerUserDto.password,
    });
    if (user.role === Role.ADMIN) {
      user.status = Status.ACTIVE;
    }

    user.credential = credential;
    await userModel.save(user);

    return "Registro exitoso";
  } catch (error: any) {
    console.error("Error al registrar usuario");

    // Si es un error de validación (específicamente de la contraseña)
    if (error instanceof ClientError) {
      return Promise.reject(new ClientError(error.message, 400));
    }

    // Si no es un error de validación, es un error interno
    throw new ClientError("No se pudo crear el usuario", 500);
  }
};

export const loginUserService = async (
  loginUserDto: LoginUserDto
): Promise<string> => {
  try {
    const user: User | null = await userModel.findOne({
      where: {
        email: loginUserDto.email,
      },
      relations: ["credential"],
    });

    if (!user) {
      throw new ClientError("El usuario no está registrado", 404);
    }

    // Verifica la contraseña
    const isPasswordValid = await checkPasswordService(
      loginUserDto.password,
      user.credential.password
    );
    if (!isPasswordValid) {
      throw new ClientError("Credenciales incorrectas", 400);
    }

    // Genera el token JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    return token;
  } catch (error) {
    console.error("Error en loginUserService:", error);
    throw error; // Lanza el error para que se maneje en un nivel superior
  }
};

export const initiatePasswordResetService = async (
  email: string
): Promise<string> => {
  try {
    const user = await userModel.findOne({ where: { email } });
    if (!user) throw new ClientError("Usuario no encontrado.");

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    const expirationDate = dayjs().add(1, "hour").toISOString();

    const passwordResetToken = resetPassword.create({
      userId: user.id,
      token,
      expiresAt: expirationDate,
    });

    await resetPassword.save(passwordResetToken);

    await sendPasswordResetEmail(user.email, token);

    return "Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.";
  } catch (error) {
    console.log(error);
    throw new ClientError("Error al enviar el correo", 500);
  }
};

export const resetPasswordService = async (
  token: string,
  newPassword: string
): Promise<string> => {
  try {
    const resetToken = await resetPassword.findOne({ where: { token } });
    if (!resetToken) throw new ClientError("Token inválido o expirado.");

    if (new Date() > resetToken.expiresAt)
      throw new ClientError("El token ha expirado.");

    const user = await userModel.findOne({
      where: { id: resetToken.userId },
      relations: ["credential"],
    });
    if (!user) throw new ClientError("Usuario no encontrado.");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const credential = await credentialModel.findOne({
      where: { id: user.credential.id },
    });
    if (!credential) throw new ClientError("Credenciales no encontradas.");
    credential.password = hashedPassword;
    await credentialModel.save(credential);
    await resetPassword.delete(resetToken.id);

    return "Contraseña restablecida correctamente.";
  } catch (error) {
    console.log(error);
    throw new ClientError("No se logro reestablecer la contraseña");
  }
};

export const findByEmail = async (email: string) => {
  try {
    const user = await userModel.findOne({
      where: { email },
      relations: ["ispCubeUser"],
    });
    if (!user) {
      throw new ClientError("El usuario no existe");
    }
    if (user.ispCubeUser) {
      const { apiKey, clientId } = user.ispCubeUser;

      if (apiKey) {
        user.ispCubeUser.apiKey = decrypt(apiKey);
      }

      if (clientId) {
        user.ispCubeUser.clientId = decrypt(clientId);
      }
    }
    return user;
  } catch (error) {
    console.log(error);
    throw new ClientError("Error al obtener el usuario", 500);
  }
};

export const findUserById = async (id: number): Promise<User> => {
  try {
    const user = await userModel.findOne({
      where: { id },
    });
    if (!user) {
      throw new ClientError("El usuario no existe");
    }
    return user;
  } catch (error) {
    throw new ClientError("Error al obtener el usuario", 500);
  }
};
