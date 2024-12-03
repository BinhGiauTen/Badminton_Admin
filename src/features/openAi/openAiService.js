import axios from "axios";
import { config } from "../../utils/axiosconfig";

const generateQuizQuestionsForFreeLesson = async (lessonId) => {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL +
      `openAI/free-lesson/${lessonId}/generate-quiz`,
    lessonId,
    config
  );
  return response.data;
};

const generateQuizQuestionsForPaidLesson = async (lessonId) => {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL +
      `openAI/paid-lesson/${lessonId}/generate-quiz`,
    lessonId,
    config
  );
  return response.data;
};

const openAiService = {
  generateQuizQuestionsForFreeLesson,
  generateQuizQuestionsForPaidLesson,
};
export default openAiService;
