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
  deviceid?: string | null;
  device?: string | null;
}

export interface InputProps {
  nombre: string;
  title: string;
  type: string;
  formikProps: FormikProps<any>;
  error?: string | null;
  textarea?: boolean;
  recoveryPass?: boolean;
  contact?: boolean;
  message?: boolean;
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

export interface RootState {
  user: {
    user: IUser;
    token: string;
    tokenIspCube: string;
    // Otras propiedades del usuario, si las hay
  };
}

export interface SubNavProps {
  typeClass: boolean;
  dataUser: IUser;
}

export interface PageProps {
  params: {
    detail: string;
  };
}

export interface BannerProps {
  img: string;
  text: string;
  title: string;
}

export interface MessageCampaign {
  id: number;
  messageIds: string[];
}

export interface Campaign {
  id: number;

  createdAt: Date;

  status: string;

  message: string;

  recipients: string[];

  messages: MessageCampaign[];

  user: IUser;
}
