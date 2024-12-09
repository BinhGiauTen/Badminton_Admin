import axiosInstance from "../../utils/axiosInstance";


const coachRegister = async (user) => {
  const response = await axiosInstance.post(
    process.env.REACT_APP_BASE_URL + `coaches/register`,
    user
  );
  return response.data;
};

const updateCoach = async (user) => {
  const response = await axiosInstance.patch(
    process.env.REACT_APP_BASE_URL + `coach/${user.id}`,
    {
      first_name: user.userData.first_name,
      last_name: user.userData.last_name,
      gender: user.userData.gender,
      dob: user.userData.dob,
    }
  );
  return response.data;
};

const updateCoachAvatar = async (id, file) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axiosInstance.patch(
    process.env.REACT_APP_BASE_URL + `coach/avatar/${id}`,
    formData
  );
  return response.data;
};

const coachService = {
  coachRegister,
  updateCoach,
  updateCoachAvatar
};
export default coachService;
