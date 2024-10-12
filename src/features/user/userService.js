import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getAllUser = async () => {
  const response = await axios.get(`${base_url}admin/users`, config);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(`${base_url}admin/user/${id}`, config);
  return response.data;
};


const userService = {
  getAllUser,
  deleteUser,
};
export default userService;
