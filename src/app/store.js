import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import coachReducer from "../features/coach/coachSlice";
import userReducer from "../features/user/userSlice";
import adminReducer from "../features/admin/adminSlice";
import categoryReducer from "../features/category/categorySlice";
import freeCourseReducer from "../features/freeCourse/freeCourseSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    coach: coachReducer,
    user: userReducer,
    admin: adminReducer,
    category: categoryReducer,
    freeCourse: freeCourseReducer,
  },
});
