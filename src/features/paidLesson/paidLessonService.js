import axiosInstance from "../../utils/axiosInstance";


const createPaidLesson = async (paidLesson) => {
  const response = await axiosInstance.post(
    process.env.REACT_APP_BASE_URL + `paid-lessons`,
    paidLesson
  );
  return response.data;
};

const updatePaidLesson = async (paidLesson) => {
  const response = await axiosInstance.patch(
    process.env.REACT_APP_BASE_URL + `paid-lessons/${paidLesson.id}`,
    {
        content: paidLesson.paidLessonData.content,
        name: paidLesson.paidLessonData.name,
        paidCourseId: paidLesson.paidLessonData.paidCourseId
    }
  );
  return response.data;
};

const getAPaidLesson = async (paidLessonId) => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `paid-lessons/${paidLessonId}`
  );
  return response.data;
};

const deletePaidLesson = async (paidLessonId) => {
    const response = await axiosInstance.delete(
      process.env.REACT_APP_BASE_URL + `paid-lessons/${paidLessonId}`
    );
    return response.data;
  };


const paidLessonService = {
  createPaidLesson,
  updatePaidLesson,
  getAPaidLesson,
  deletePaidLesson,
};
export default paidLessonService;
