import axios from "axios";
import { config } from "../../utils/axiosconfig";

const getAllFreeCourse = async () => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + `free-courses`,
    config
  );
  return response.data;
};

const createFreeCourse = async (freeCourse) => {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + `free-courses`,
    freeCourse,
    config
  );
  return response.data;
};

const updateFreeCourse = async (freeCourse) => {
  const response = await axios.patch(
    process.env.REACT_APP_BASE_URL + `free-courses/${freeCourse.id}`,
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

const updateFreeCourseThumbnail = async (freeCourseId,file) => {
  const formData = new FormData();
  formData.append("image",file);
  const response = await axios.patch(
    process.env.REACT_APP_BASE_URL + `free-courses/thumbnail/${freeCourseId}`,
    formData,
    config
  );
  return response.data;
};

const getAFreeCourse = async (freeCourseId) => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + `free-courses/${freeCourseId}`,
    config
  );
  return response.data;
};

const getFreeCourseByCategoryId = async (categoryId) => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + `free-courses/category/${categoryId}`,
    config
  );
  return response.data;
};

const deleteFreeCourse = async (freeCourseId) => {
  const response = await axios.delete(
    process.env.REACT_APP_BASE_URL + `free-courses/${freeCourseId}`,
    config
  );
  return response.data;
};

const freeCourseService = {
  createFreeCourse,
  getAllFreeCourse,
  updateFreeCourse,
  getAFreeCourse,
  deleteFreeCourse,
  getFreeCourseByCategoryId,
  updateFreeCourseThumbnail
};
export default freeCourseService;
