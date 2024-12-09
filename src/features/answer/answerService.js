import axiosInstance from "../../utils/axiosInstance";


const getAllAnswerByQuestionId = async (questionId) => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `answers/${questionId}`
  );
  return response.data;
};

const createAnswer = async (answer) => {
  const response = await axiosInstance.post(
    process.env.REACT_APP_BASE_URL + `answers`,
    answer
  );
  return response.data;
};

const updateAnswer = async (answer) => {
  const response = await axiosInstance.patch(
    process.env.REACT_APP_BASE_URL + `answers/${answer.id}`,
    {
        text: answer.answerData.text,
        questionId: answer.answerData.questionId
    }
  );
  return response.data;
};

const deleteAnswer = async (answerId) => {
  const response = await axiosInstance.delete(
    process.env.REACT_APP_BASE_URL + `answers/${answerId}`
  );
  return response.data;
};

const answerService = {
  getAllAnswerByQuestionId,
  createAnswer,
  updateAnswer,
  deleteAnswer
};
export default answerService;
