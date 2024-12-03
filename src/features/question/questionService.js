import axios from "axios";
import { config } from "../../utils/axiosconfig";

const createQuestionForFreeLesson = async (question) => {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + `questions/free-lesson`,
    question,
    config
  );
  return response.data;
};

const createQuestionForPaidLesson = async (question) => {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + `questions/paid-lesson`,
    question,
    config
  );
  return response.data;
};

const updateQuestionForFreeLesson = async (question) => {
  const response = await axios.patch(
    process.env.REACT_APP_BASE_URL + `questions/free-lesson/${question.id}`,
    {
      text: question.questionData.text,
      rightAnswer: question.questionData.rightAnswer,
      freeLessonId: question.questionData.freeLessonId,
    },
    config
  );
  return response.data;
};

const updateQuestionForPaidLesson = async (question) => {
  const response = await axios.patch(
    process.env.REACT_APP_BASE_URL + `questions/paid-lesson/${question.id}`,
    {
      text: question.questionData.text,
      rightAnswer: question.questionData.rightAnswer,
      paidLessonId: question.questionData.paidLessonId,
    },
    config
  );
  return response.data;
};

const getAllQuestionByFreeLessonId = async (lessonId) => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + `questions/free-lesson/${lessonId}`,
    config
  );
  return response.data;
};

const getAllQuestionByPaidLessonId = async (lessonId) => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + `questions/paid-lesson/${lessonId}`,
    config
  );
  return response.data;
};

const getQuestionById = async (questionId) => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + `questions/${questionId}`,
    config
  );
  return response.data;
};

const deleteQuestion = async (questionId) => {
  const response = await axios.delete(
    process.env.REACT_APP_BASE_URL + `questions/${questionId}`,
    config
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
