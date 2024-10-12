import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getAllCoach = async (id) => {
  const response = await axios.get(`${base_url}admin/coaches`, config);
  return response.data;
};

const deleteCoach = async (id) => {
  const response = await axios.delete(`${base_url}admin/coach/${id}`, config);
  return response.data;
};

const coachService = {
  getAllCoach,
  deleteCoach,
};
export default coachService;
