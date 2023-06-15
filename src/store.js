import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
