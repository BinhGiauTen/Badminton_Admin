import axios from "axios";
import { config } from "../../utils/axiosconfig";

const getAllCoach = async (id) => {
  const response = await axios.get(process.env.REACT_APP_BASE_URL + `admin/coaches`, config);
  return response.data;
};

const deleteCoach = async (id) => {
  const response = await axios.delete(process.env.REACT_APP_BASE_URL + `admin/coach/${id}`, config);
  return response.data;
};

const coachService = {
  getAllCoach,
  deleteCoach,
};
export default coachService;
