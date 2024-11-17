import axios from "axios";
import { config } from "../../utils/axiosconfig";

const adminRegister = async (user) => {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + `admin/register`,
    user
  );
  return response.data;
};

const getAllUser = async () => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + `admin/users`,
    config
  );
  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(
    process.env.REACT_APP_BASE_URL + `admin/user/${id}`,
    config
  );
  return response.data;
};

const adminService = {
  adminRegister,
  getAllUser,
  deleteUser,
};
export default adminService;
