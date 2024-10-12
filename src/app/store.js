import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import coachReducer from "../features/coach/coachSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    coach: coachReducer
  },
});
