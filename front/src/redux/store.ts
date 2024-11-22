import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import ispCubeReducer from "./IspCubeSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    ispCube: ispCubeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // Agrega este tipo

export default store;
