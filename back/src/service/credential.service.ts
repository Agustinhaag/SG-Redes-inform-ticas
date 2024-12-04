import { validateOrReject } from "class-validator";
import bcrypt from "bcrypt";
import { Credential } from "../entities/Credentials";
import { credentialModel } from "../config/dataSource";
import CreateCredentialDto from "../dtos/credentialDto";
import { ClientError } from "../utils/errors";

export const createCredentialService = async (
  credentialDto: CreateCredentialDto
): Promise<Credential> => {
  try {
    const { password } = credentialDto;

    const tempCredential = new Credential();
    tempCredential.password = password; // Validamos la contraseña sin hash
   

    await validateOrReject(tempCredential); // Validación con class-validator

    // Si pasa la validación, hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear credencial y guardarla
    const credential = credentialModel.create({
      password: hashedPassword, 
    });

    await credentialModel.save(credential);

    return credential;
  } catch (error) {

    if (Array.isArray(error) && error[0]?.constraints) {
      // Lanzar un error controlado de validación
      throw new ClientError(
        `Error de validación: ${error
          .map((e) => Object.values(e.constraints).join(", "))
          .join("; ")}`,
        400
      );
    }

    // Lanzar un error genérico para otros problemas
    throw new ClientError("No se pudo crear la credencial.", 500);
  }
};

export const checkPasswordService = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
