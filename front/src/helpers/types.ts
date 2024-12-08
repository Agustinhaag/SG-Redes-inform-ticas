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
  tokenwablas?: string | null;
}

export interface InputProps {
  nombre: string;
  title: string;
  type: string;
  formikProps: FormikProps<any>;
  error?: string | null;
  textarea?: boolean;
  recoveryPass?: boolean;
  contact?:boolean;
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

export interface FormValues {
  addressee: string;
  message: string;
  filters: {
    node_code: string[];
    status: string[];
    debt: string[];
    showNodeDropdown: boolean;
    plan_name: number[]; // Valores seleccionados de plan_id
    showPlanDropdown: boolean;
  };
}

export interface IMessageUser {
  category: string;
  date: { created_at: string; updated_at: string };
  file: null;
  id: string;
  message: string;
  phone: { from: string; to: string };
  status: string;
  type: string;
  userName: string;
}
