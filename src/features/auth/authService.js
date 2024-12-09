import axiosInstance from "../../utils/axiosInstance";

const login = async (user) => {
  const response = await axiosInstance.post(
    process.env.REACT_APP_BASE_URL + `auth/login`,
    user
  );
  return response.data;
};

const forgotPassword = async (data) => {
  const response = await axiosInstance.post(
    process.env.REACT_APP_BASE_URL + `auth/forgot-password`,
    data
  );
  return response.data;
};

const resetPassword = async (data) => {
  const response = await axiosInstance.post(
    process.env.REACT_APP_BASE_URL + `auth/reset-password`,
    data
  );
  return response.data;
};

const verifyOTP = async (data) => {
  const response = await axiosInstance.post(
    process.env.REACT_APP_BASE_URL + `auth/verify-otp`,
    data
  );
  return response.data;
};

const logout = async () => {
  const response = await axiosInstance.post(
    process.env.REACT_APP_BASE_URL + `auth/logout`
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
