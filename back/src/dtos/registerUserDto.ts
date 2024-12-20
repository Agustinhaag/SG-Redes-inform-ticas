import { Role } from "../utils/types";

interface RegisterUserDto {
  email: string;
  password: string;
  name: string;
  surname: string;
  phone: string;
  role?: Role;
  deviceid?: string;
  tokenwablas?: string;
}

export default RegisterUserDto;
