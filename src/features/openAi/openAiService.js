import axiosInstance from "../../utils/axiosInstance";


const generateQuizQuestionsForFreeLesson = async (lessonId) => {
  const response = await axiosInstance.post(
    process.env.REACT_APP_BASE_URL +
      `openAI/free-lesson/${lessonId}/generate-quiz`,
    lessonId
  );
  return response.data;
};

const generateQuizQuestionsForPaidLesson = async (lessonId) => {
  const response = await axiosInstance.post(
    process.env.REACT_APP_BASE_URL +
      `openAI/paid-lesson/${lessonId}/generate-quiz`,
    lessonId
  );
  return response.data;
};

const openAiService = {
  generateQuizQuestionsForFreeLesson,
  generateQuizQuestionsForPaidLesson,
};
export default openAiService;
