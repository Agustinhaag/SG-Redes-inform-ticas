import { FormikProps } from "formik";

export interface IUserLogin {
  email: string;
  password: string;
}
export interface IUserRegister {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
}
export interface HandlePropsRegister {
  values: IUserRegister | IUserLogin;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  url: string;
  titleSwal: string;
  textSwal: string;
  textError: string;
}
export interface TokenProps {
  token: string;
}

export interface PaginationProps {
  productsPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalProducts: number | undefined;
}
export interface IUser {
  email: string;
  id: number;
  name: string;
  phone: string;
  role: string;
  status: string;
  surname: string;
}

export interface InputProps {
  nombre: string;
  title: string;
  type: string;
  formikProps: FormikProps<any>;
  error?: string | null;
  textarea?: boolean;
  recoveryPass?: boolean;
}

export interface IUserIspCube {
  username: string;
  passwordIspCube: string;
  clientId: string;
  apiKey: string;
}

export type IspCubeState = {
  users: any[];
  loading: boolean;
  error: string | null;
};