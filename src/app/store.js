import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import coachReducer from "../features/coach/coachSlice";
import userReducer from "../features/user/userSlice";
import adminReducer from "../features/admin/adminSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    coach: coachReducer,
    user: userReducer,
    admin: adminReducer
  },
});
