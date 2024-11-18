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

const getAllCoach = async () => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + `admin/coaches`,
    config
  );
  return response.data;
};

const deleteCoach = async (id) => {
  const response = await axios.delete(
    process.env.REACT_APP_BASE_URL + `admin/coach/${id}`,
    config
  );
  return response.data;
};

const updateAdmin = async (user) => {
  const response = await axios.patch(
    process.env.REACT_APP_BASE_URL + `admin/${user.id}`,
    {
      first_name: user.userData.first_name,
      last_name: user.userData.last_name,
      gender: user.userData.gender,
      dob: user.userData.dob,
    },
    config
  );
  // if (response.data) {
  //   localStorage.setItem("User", JSON.stringify(response.data));
  // }
  console.log("Response data:", response.data);
  return response.data;
};

const updateAdminAvatar = async (id, file) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axios.patch(
    process.env.REACT_APP_BASE_URL + `admin/avatar/${id}`,
    formData,
    config
  );
  return response.data;
};

const adminService = {
  adminRegister,
  getAllUser,
  deleteUser,
  getAllCoach,
  deleteCoach,
  updateAdmin,
  updateAdminAvatar,
};
export default adminService;
