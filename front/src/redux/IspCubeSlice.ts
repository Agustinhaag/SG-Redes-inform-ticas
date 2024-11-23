import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IspCubeState {
  users: any[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: IspCubeState = {
  users: [],
  loading: false,
  error: null,
};

const ispCubeSlice = createSlice({
  name: "ispCube",
  initialState,
  reducers: {
    fetchUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutData(state, action: PayloadAction<any[]>) {
      state.error = null;
      state.loading = false;
      state.users = null;
    },
  },
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure,logoutData } =
  ispCubeSlice.actions;
export default ispCubeSlice.reducer;
