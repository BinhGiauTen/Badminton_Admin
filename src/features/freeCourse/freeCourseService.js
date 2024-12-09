import axiosInstance from "../../utils/axiosInstance";


const getAllFreeCourse = async () => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `free-courses`
  );
  return response.data;
};

const createFreeCourse = async (freeCourse) => {
  const response = await axiosInstance.post(
    process.env.REACT_APP_BASE_URL + `free-courses`,
    freeCourse
  );
  return response.data;
};

const updateFreeCourse = async (freeCourse) => {
  const response = await axiosInstance.patch(
    process.env.REACT_APP_BASE_URL + `free-courses/${freeCourse.id}`,
    {
        name: freeCourse.freeCourseData.name,
        description: freeCourse.freeCourseData.description,
        thumbnail: freeCourse.freeCourseData.thumbnail,
        categoryId: freeCourse.freeCourseData.category,
        lessonQuantity: freeCourse.freeCourseData.lessonQuantity,
    }
  );
  return response.data;
};

const updateFreeCourseThumbnail = async (freeCourseId,file) => {
  const formData = new FormData();
  formData.append("image",file);
  const response = await axiosInstance.patch(
    process.env.REACT_APP_BASE_URL + `free-courses/thumbnail/${freeCourseId}`,
    formData
  );
  return response.data;
};

const getAFreeCourse = async (freeCourseId) => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `free-courses/${freeCourseId}`
  );
  return response.data;
};

const getFreeCourseByCategoryId = async (categoryId) => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `free-courses/category/${categoryId}`
  );
  return response.data;
};

const deleteFreeCourse = async (freeCourseId) => {
  const response = await axiosInstance.delete(
    process.env.REACT_APP_BASE_URL + `free-courses/${freeCourseId}`
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
