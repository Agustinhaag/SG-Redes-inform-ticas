import React from "react";
import style from "./button.module.css";
const ButtonLogin: React.FC<{ loading: boolean; name: string }> = ({
  loading,
  name,
}) => {
  return (
    <button
      type="submit"
      className="relative flex items-center justify-center bg-custom-blue text-custom-white min-h-10 rounded-md md:text-base md:py-2 md:px-5 hover:cursor-pointer hover:bg-blue-700 hover:text-custom-white text-sm py-1.5 px-4"
      disabled={loading}
    >
      {loading ? <span className={style.loader}></span> : name}
    </button>
  );
};

export default ButtonLogin;
