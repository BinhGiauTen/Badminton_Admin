import axiosInstance from "../../utils/axiosInstance";

const adminRegister = async (user) => {
  const response = await axiosInstance.post(
    process.env.REACT_APP_BASE_URL + `admin/register`,
    user
  );
  return response.data;
};

const getAllUser = async () => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `admin/users`
  );
  return response.data;
};

const deleteUser = async (id) => {
  const response = await axiosInstance.delete(
    process.env.REACT_APP_BASE_URL + `admin/user/${id}`
  );
  return response.data;
};

const getAllCoach = async () => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `admin/coaches`
  );
  return response.data;
};

const deleteCoach = async (id) => {
  const response = await axiosInstance.delete(
    process.env.REACT_APP_BASE_URL + `admin/coach/${id}`
  );
  return response.data;
};

const getAdminById = async (id) => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `admin/${id}`
  );
  return response.data;
};

const updateAdmin = async (user) => {
  const response = await axiosInstance.patch(
    process.env.REACT_APP_BASE_URL + `admin/${user.id}`,
    {
      firstName: user.userData.firstName,
      lastName: user.userData.lastName,
      gender: user.userData.gender,
      dob: user.userData.dob,
      email: user.userData.email
    },
  );
  if(response.data.data){
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }
  return response.data;
};

const updateAdminAvatar = async (id, file) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axiosInstance.patch(
    process.env.REACT_APP_BASE_URL + `admin/avatar/${id}`,
    formData
  );
  if(response.data.data){
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }
  return response.data;
};

const adminService = {
  adminRegister,
  getAllUser,
  deleteUser,
  getAllCoach,
  deleteCoach,
  getAdminById,
  updateAdmin,
  updateAdminAvatar,
};
export default adminService;
