import { IUser } from "@/helpers/types";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState: { user: IUser | null; token: string | null; tokenIspCube: string | null} = {
  user: null,
  token: Cookies.get("token") || null,
  tokenIspCube: Cookies.get("tokenIspCube") || null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: { payload: IUser }) => {
      state.user = action.payload;
    },
    
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        Cookies.set("token", action.payload, { expires: 3 });
      }
    },
    setTokenIspCube: (state, action) => {
      state.tokenIspCube = action.payload;
      if (action.payload) {
        Cookies.set("tokenIspCube", action.payload, { expires: 3 });
      }
    },
    logoutSistem: (state) => {
      state.tokenIspCube = null;
      Cookies.remove("tokenIspCube");

    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.tokenIspCube = null;
      Cookies.remove("token");
      Cookies.remove("tokenIspCube");

    },
  },
});

export const { setUserData, setToken, logout,setTokenIspCube,logoutSistem } = userSlice.actions;
export default userSlice.reducer;
