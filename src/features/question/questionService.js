import axiosInstance from "../../utils/axiosInstance";


const createQuestionForFreeLesson = async (question) => {
  const response = await axiosInstance.post(
    process.env.REACT_APP_BASE_URL + `questions/free-lesson`,
    question
  );
  return response.data;
};

const createQuestionForPaidLesson = async (question) => {
  const response = await axiosInstance.post(
    process.env.REACT_APP_BASE_URL + `questions/paid-lesson`,
    question
  );
  return response.data;
};

const updateQuestionForFreeLesson = async (question) => {
  const response = await axiosInstance.patch(
    process.env.REACT_APP_BASE_URL + `questions/free-lesson/${question.id}`,
    {
      text: question.questionData.text,
      rightAnswer: question.questionData.rightAnswer,
      freeLessonId: question.questionData.freeLessonId,
    }
  );
  return response.data;
};

const updateQuestionForPaidLesson = async (question) => {
  const response = await axiosInstance.patch(
    process.env.REACT_APP_BASE_URL + `questions/paid-lesson/${question.id}`,
    {
      text: question.questionData.text,
      rightAnswer: question.questionData.rightAnswer,
      paidLessonId: question.questionData.paidLessonId,
    }
  );
  return response.data;
};

const getAllQuestionByFreeLessonId = async (lessonId) => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `questions/free-lesson/${lessonId}`
  );
  return response.data;
};

const getAllQuestionByPaidLessonId = async (lessonId) => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `questions/paid-lesson/${lessonId}`
  );
  return response.data;
};

const getQuestionById = async (questionId) => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `questions/${questionId}`
  );
  return response.data;
};

const deleteQuestion = async (questionId) => {
  const response = await axiosInstance.delete(
    process.env.REACT_APP_BASE_URL + `questions/${questionId}`
  );
  return response.data;
};

const questionService = {
  createQuestionForFreeLesson,
  createQuestionForPaidLesson,
  updateQuestionForFreeLesson,
  updateQuestionForPaidLesson,
  getAllQuestionByFreeLessonId,
  getAllQuestionByPaidLessonId,
  getQuestionById,
  deleteQuestion,
};
export default questionService;
