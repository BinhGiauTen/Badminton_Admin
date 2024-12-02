import axios from "axios";
import { config } from "../../utils/axiosconfig";

const createPaidLesson = async (paidLesson) => {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + `paid-lessons`,
    paidLesson,
    config
  );
  return response.data;
};

const updatePaidLesson = async (paidLesson) => {
  const response = await axios.patch(
    process.env.REACT_APP_BASE_URL + `paid-lessons/${paidLesson.id}`,
    {
        content: paidLesson.paidLessonData.content,
        paidCourseId: paidLesson.paidLessonData.paidCourseId
    },
    config
  );
  return response.data;
};

const getAPaidLesson = async (paidLessonId) => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + `paid-lessons/${paidLessonId}`,
    config
  );
  return response.data;
};

const deletePaidLesson = async (paidLessonId) => {
    const response = await axios.delete(
      process.env.REACT_APP_BASE_URL + `paid-lessons/${paidLessonId}`,
      config
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
