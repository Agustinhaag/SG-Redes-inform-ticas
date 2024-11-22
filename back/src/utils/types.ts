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