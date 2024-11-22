import { Dispatch } from "redux";
import { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } from "../redux/IspCubeSlice";
import { fetchAllUsersIspCube } from "./fetchIspCube";

export const fetchUsersIspCube = (url: string, email: string, token: string, tokenIspCube: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchUsersStart()); 

    try {
      const users = await fetchAllUsersIspCube(url, email, token, tokenIspCube);
      dispatch(fetchUsersSuccess(users)); 
    } catch (error: any) {
      dispatch(fetchUsersFailure(error.message || "Error al obtener los usuarios"));
    }
  };
};
