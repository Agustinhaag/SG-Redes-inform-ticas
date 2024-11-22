"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setUserData, setToken } from "./userSlice";
import { fetchDataUser } from "@/helpers/fetchDataUser";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const secret = process.env.NEXT_PUBLIC_SECRET;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    const tokenString = Cookies.get("token");
    if (tokenString) {
      fetchDataUser(tokenString, secret, url)
        .then((userData) => {
          dispatch(setUserData(userData));
          dispatch(setToken(tokenString));
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        });
    }
  }, [dispatch, secret, url]);

  return <>{children}</>;
};