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
    process.env.REACT_APP_BASE_URL + `coaches/${user.id}`,
    {
      firstName: user.userData.firstName,
      lastName: user.userData.lastName,
      gender: user.userData.gender,
      dob: user.userData.dob,
      email: user.userData.email,
      description: user.userData.description
    }
  );
  if(response.data.data){
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }
  return response.data;
};

const updateCoachAvatar = async (id, file) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axiosInstance.patch(
    process.env.REACT_APP_BASE_URL + `coaches/avatar/${id}`,
    formData
  );
  if(response.data.data){
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }
  return response.data;
};

const coachService = {
  coachRegister,
  updateCoach,
  updateCoachAvatar
};
export default coachService;
