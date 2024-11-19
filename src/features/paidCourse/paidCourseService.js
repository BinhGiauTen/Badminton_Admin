import axios from "axios";
import { config } from "../../utils/axiosconfig";

const getAllPaidCourse = async () => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + `paid-courses`,
    config
  );
  return response.data;
};

const createPaidCourse = async (paidCourse) => {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + `paid-courses`,
    paidCourse,
    config
  );
  return response.data;
};

const updatePaidCourse = async (paidCourse) => {
  const response = await axios.patch(
    process.env.REACT_APP_BASE_URL + `paid-courses/${paidCourse.id}`,
    {
        name: paidCourse.paidCourseData.name,
        description: paidCourse.paidCourseData.description,
        thumbnail: paidCourse.paidCourseData.thumbnail,
        coachId: paidCourse.paidCourseData.coachId,
        categoryId: paidCourse.paidCourseData.category,
        lessonQuantity: paidCourse.paidCourseData.lessonQuantity,
    },
    config
  );
  return response.data;
};

const updatePaidCourseThumbnail = async (paidCourseId,file) => {
    const formData = new FormData();
    formData.append("image",file);
    const response = await axios.patch(
      process.env.REACT_APP_BASE_URL + `paid-courses/thumbnail/${paidCourseId}`,
      formData,
      config
    );
    return response.data;
  };

const getAPaidCourse = async (paidCourseId) => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + `paid-courses/${paidCourseId}`,
    config
  );
  return response.data;
};

const getPaidCourseByCategoryId = async (categoryId) => {
    const response = await axios.get(
      process.env.REACT_APP_BASE_URL + `paid-courses/category/${categoryId}`,
      config
    );
    return response.data;
  };

const deletePaidCourse = async (paidCourseId, coachId) => {
  const response = await axios.delete(
    process.env.REACT_APP_BASE_URL + `paid-courses/${paidCourseId}/${coachId}`,
    config
  );
  return response.data;
};

const paidCourseService = {
  createPaidCourse,
  getAllPaidCourse,
  updatePaidCourse,
  getAPaidCourse,
  deletePaidCourse,
  getPaidCourseByCategoryId,
  updatePaidCourseThumbnail
};
export default paidCourseService;
