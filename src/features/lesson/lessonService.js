import axios from "axios";
import { config } from "../../utils/axiosconfig";

const createFreeLesson = async (freeLesson) => {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + `lessons/free`,
    freeLesson,
    config
  );
  return response.data;
};

const updateFreeLesson = async (freeLesson) => {
  const response = await axios.patch(
    process.env.REACT_APP_BASE_URL + `lessons/free/${freeLesson.id}`,
    {
        content: freeLesson.freeLessonData.content,
    },
    config
  );
  return response.data;
};

const getAFreeLesson = async (freeLessonId) => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + `lessons/free/${freeLessonId}`,
    config
  );
  return response.data;
};

const deleteFreeLesson = async (freeLessonId) => {
    const response = await axios.delete(
      process.env.REACT_APP_BASE_URL + `lessons/free/${freeLessonId}`,
      config
    );
    return response.data;
  };

const lessonService = {
  createFreeLesson,
  updateFreeLesson,
  getAFreeLesson,
  deleteFreeLesson
};
export default lessonService;