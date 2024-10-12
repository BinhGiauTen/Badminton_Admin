import axios from "axios";
import { base_url } from "../../utils/base_url";

const login = async (user) => {
  const response = await axios.post(`${base_url}auth/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.person));
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data;
};


const authService = {
  login,
};
export default authService;