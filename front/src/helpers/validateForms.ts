import { FormikValues } from "formik";

export const validarRegister = (input: FormikValues): Partial<FormikValues> => {
  const errors: Partial<FormikValues> = {};
  const emailRegex: RegExp = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
  const passwordRegex: RegExp =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|-]).+$/;

  if (!input.name) {
    errors.name = "El nombre es requerido";
  }
  if (!input.surname) {
    errors.surname = "El apellido es requerido";
  }
  if (!input.email) {
    errors.email = "El email es requerido";
  }
  if (!input.phone) {
    errors.phone = "El número de teléfono es requerido";
  }
  if (!input.password) {
    errors.password = "La contraseña es requerida";
  }
  if (input.email && !emailRegex.test(input.email)) {
    errors.email = "El email es inválido";
  }
  if (input.password && !passwordRegex.test(input.password)) {
    errors.password =
      "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un caractér especial";
  }
  return errors;
};

export const validarLogin = (input: FormikValues): Partial<FormikValues> => {
  const errors: Partial<FormikValues> = {};
  const emailRegex: RegExp = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;

  if (!input.email) {
    errors.email = "El email es requerido";
  }
  if (!input.password) {
    errors.password = "La contraseña es requerida";
  }
  if (input.email && !emailRegex.test(input.email)) {
    errors.email = "El email es inválido";
  }
  return errors;
};

export const validarEmail = (input: FormikValues): Partial<FormikValues> => {
  const errors: Partial<FormikValues> = {};
  const emailRegex: RegExp = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;

  if (!input.email) {
    errors.email = "El email es requerido";
  }
  if (input.email && !emailRegex.test(input.email)) {
    errors.email = "El email es inválido";
  }
  return errors;
};
export const validatePassword = (
  input: FormikValues
): Partial<FormikValues> => {
  const errors: Partial<FormikValues> = {};
  const passwordRegex: RegExp =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|-]).+$/;

  if (!input.password) {
    errors.password = "La contraseña es requerida";
  }
  if (input.password && !passwordRegex.test(input.password)) {
    errors.password =
      "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un caractér especial";
  }

  if (!input.repeatPassword) {
    errors.repeatPassword = "Debe repetir la contraseña";
  }

  if (input.password !== input.repeatPassword) {
    errors.repeatPassword = "Las contraseñas no coinciden";
    errors.password = "Las contraseñas no coinciden";
  }

  return errors;
};

export const validateLoginIspCube = (input: FormikValues): Partial<FormikValues> => {
  const errors: Partial<FormikValues> = {};

  if (!input.username) {
    errors.username = "El usuario es requerido";
  }
  if (!input.apiKey) {
    errors.apiKey = "La Api-Key es requerida";
  }
  if (!input.clientId) {
    errors.clientId = "El Id de cliente es requerido";
  }
  if (!input.passwordIspCube) {
    errors.passwordIspCube = "La contraseña es requerida";
  }
 
  return errors;
};
