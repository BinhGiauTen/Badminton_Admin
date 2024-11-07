import axios from "axios";
import { config } from "../../utils/axiosconfig";

const login = async (user) => {
  console.log(process.env.BASE_URL);
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + `auth/login`,
    user
  );
  return response.data;
};

const forgotPassword = async (data) => {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + `auth/forgot-password`,
    data
  );
  return response.data;
};

const resetPassword = async (data) => {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + `auth/reset-password`,
    data
  );
  return response.data;
};

const verifyOTP = async (data) => {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + `auth/verify-otp`,
    data
  );
  return response.data;
};

const logout = async () => {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + `auth/logout`,
    config
  );
  return response.data;
};

const authService = {
  login,
  forgotPassword,
  resetPassword,
  verifyOTP,
  logout,
};
export default authService;
