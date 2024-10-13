import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import coachReducer from "../features/coach/coachSlice";
import userReducer from "../features/user/userSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    coach: coachReducer,
    user: userReducer
  },
});
