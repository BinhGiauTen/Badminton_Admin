import axiosInstance from "../../utils/axiosInstance";

const getAllPaidCourse = async () => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `paid-courses`
  );
  return response.data;
};

const createPaidCourse = async (paidCourse) => {
  const response = await axiosInstance.post(
    process.env.REACT_APP_BASE_URL + `paid-courses`,
    paidCourse
  );
  return response.data;
};

const updatePaidCourse = async (paidCourse) => {
  const response = await axiosInstance.patch(
    process.env.REACT_APP_BASE_URL + `paid-courses/${paidCourse.id}`,
    {
        name: paidCourse.paidCourseData.name,
        description: paidCourse.paidCourseData.description,
        thumbnail: paidCourse.paidCourseData.thumbnail,
        coachId: paidCourse.paidCourseData.coachId,
        categoryId: paidCourse.paidCourseData.category,
        lessonQuantity: paidCourse.paidCourseData.lessonQuantity,
        price: paidCourse.paidCourseData.price,
        status: paidCourse.paidCourseData.status,
    }
  );
  return response.data;
};

const updatePaidCourseThumbnail = async (paidCourseId,file) => {
    const formData = new FormData();
    formData.append("image",file);
    const response = await axiosInstance.patch(
      process.env.REACT_APP_BASE_URL + `paid-courses/thumbnail/${paidCourseId}`,
      formData
    );
    return response.data;
  };

const getAPaidCourse = async (paidCourseId) => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `paid-courses/${paidCourseId}`
  );
  return response.data;
};

const getPaidCourseByCategoryId = async (categoryId) => {
    const response = await axiosInstance.get(
      process.env.REACT_APP_BASE_URL + `paid-courses/category/${categoryId}`
    );
    return response.data;
  };

  const getPaidCourseByCoachId = async (coachId) => {
    const response = await axiosInstance.get(
      process.env.REACT_APP_BASE_URL + `paid-courses/coach/${coachId}`
    );
    return response.data;
  };

const deletePaidCourse = async (paidCourseId) => {
  const response = await axiosInstance.delete(
    process.env.REACT_APP_BASE_URL + `paid-courses/${paidCourseId}`
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
  getPaidCourseByCoachId,
  updatePaidCourseThumbnail
};
export default paidCourseService;
