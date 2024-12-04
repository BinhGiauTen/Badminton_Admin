import axios from "axios";
import { config } from "../../utils/axiosconfig";

const getAllAnswerByQuestionId = async (questionId) => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + `answers/${questionId}`,
    config
  );
  return response.data;
};

const createAnswer = async (answer) => {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + `answers`,
    answer,
    config
  );
  return response.data;
};

const updateAnswer = async (answer) => {
  const response = await axios.patch(
    process.env.REACT_APP_BASE_URL + `answers/${answer.id}`,
    {
        text: answer.answerData.text,
        questionId: answer.answerData.questionId
    },
    config
  );
  return response.data;
};

const deleteAnswer = async (answerId) => {
  const response = await axios.delete(
    process.env.REACT_APP_BASE_URL + `answers/${answerId}`,
    config
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
