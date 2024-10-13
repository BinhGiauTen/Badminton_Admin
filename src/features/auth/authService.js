import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const login = async (user) => {
  const response = await axios.post(`${base_url}auth/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.person));
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data;
};

const forgotPassword = async (email) => {
  const response = await axios.post(
    `${base_url}auth/forgot-password`,
    {
      email,
    },
    config
  );
  return response.data;
};

const resetPassword = async (otp, newPassword) => {
  const response = await axios.post(
    `${base_url}auth/reset-password`,
    {
      otp,
      newPassword,
    },
    config
  );
  return response.data;
};

const logout = async () => {
  const response = await axios.post(
    `${base_url}auth/logout`,
    config
  );
  return response.data;
};


const authService = {
  login,
  forgotPassword,
  resetPassword,
  logout
};
export default authService;
