import axios from "axios";
import { config } from "../../utils/axiosconfig";

const getAllUser = async () => {
  console.log("Config:",config);
  const response = await axios.get(process.env.REACT_APP_BASE_URL + `admin/users`, config);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(process.env.REACT_APP_BASE_URL + `admin/user/${id}`, config);
  return response.data;
};


const userService = {
  getAllUser,
  deleteUser,
};
export default userService;
