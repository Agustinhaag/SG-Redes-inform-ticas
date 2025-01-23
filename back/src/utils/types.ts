export interface PropsFetchUsersIspCube {
  apiKey: string;
  clientId: string;
  passwordIspCube: string;
  username: string;
}

export enum Role {
    ADMIN = "admin",
    USER = "user",
  }
  
export enum Status {
    ACTIVE = "active",
    SUSPENDED = "suspended",
  }

  export enum StatusCampaign{
    CANCEL = "Cancelado",
    PROCESS = "Procesando",
    FINISH = "Finalizado",
    SENDWABLAS = "Enviado a wablas"
  }