import axios from "axios";
import { config } from "../../utils/axiosconfig";

const getAllFreeCourse = async () => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + `courses/free`,
    config
  );
  return response.data;
};

const createFreeCourse = async (freeCourse) => {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + `courses/free`,
    freeCourse,
    config
  );
  return response.data;
};

const updateFreeCourse = async (freeCourse) => {
  const response = await axios.patch(
    process.env.REACT_APP_BASE_URL + `courses/free/${freeCourse.id}`,
    {
        name: freeCourse.freeCourseData.name,
        description: freeCourse.freeCourseData.description,
        thumbnail: freeCourse.freeCourseData.thumbnail,
        categoryId: freeCourse.freeCourseData.category,
        lessonQuantity: freeCourse.freeCourseData.lessonQuantity,
    },
    config
  );
  return response.data;
};

const getAFreeCourse = async (freeCourseId) => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + `courses/free/${freeCourseId}`,
    config
  );
  return response.data;
};

const deleteFreeCourse = async (freeCourseId) => {
  const response = await axios.delete(
    process.env.REACT_APP_BASE_URL + `courses/free/${freeCourseId}`,
    config
  );
  return response.data;
};

const freeCourseService = {
  createFreeCourse,
  getAllFreeCourse,
  updateFreeCourse,
  getAFreeCourse,
  deleteFreeCourse
};
export default freeCourseService;
