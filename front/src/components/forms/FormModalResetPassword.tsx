import React, { useState } from "react";

import style from "./button.module.css";
import { fetchResetPassword } from "@/helpers/resetPassword";

const FormModalResetPassword: React.FC<{
  setViewResetPassword: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setViewResetPassword }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const url = process.env.NEXT_PUBLIC_URL;

  const validateEmail = (email: string): string | null => {
    if (!email) {
      return "El campo no puede estar vacío.";
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Por favor, ingrese un correo válido.";
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      setLoading(false);

      return;
    }
    const response = await fetchResetPassword(url!, email, setLoading);
    if (response && response.ok) {
      setLoading(false);
      setViewResetPassword(false);
    }
  };

  return (
    <div>
      <div>
        <input
          type="email"
          name="email-reset"
          className={`mt-1 outline-none w-full p-2 sm:h-12 h-9 rounded-xl border-2 bg-transparent text-custom-white; ${
            error ? "border-red-500" : "border-custom-white"
          }`}
          placeholder="Ingrese su email"
          value={email}
          onChange={handleChange}
        />
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>

      <div className="cont-btn flex flex-col w-full justify-center mb-3 mt-5">
        <button
          type="button"
          className="relative flex items-center justify-center bg-custom-blue text-custom-white min-h-10 rounded-md md:text-base md:py-2 md:px-5 hover:cursor-pointer hover:bg-blue-700 hover:text-custom-white text-sm py-1.5 px-4"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <span className={style.loader}></span> : "Enviar"}
        </button>
      </div>
    </div>
  );
};

export default FormModalResetPassword;
