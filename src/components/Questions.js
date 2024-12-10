import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Collapse, Input, List } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  deleteQuestion,
  getAllQuestionByFreeLessonId,
} from "../features/question/questionSlice";
import { generateQuizQuestionsForFreeLesson } from "../features/openAi/openAiSlice";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import CustomModal from "../components/CustomModal";
import { getAFreeLesson } from "../features/freeLesson/freeLessonSlice";
import {
  createAnswer,
  deleteAnswer,
  getAllAnswerByQuestionId,
  updateAnswer,
} from "../features/answer/answerSlice";

const { Panel } = Collapse;

const Questions = () => {
  const [openDeleteQuestionModal, setOpenDeleteQuestionModal] = useState(false);
  const [openDeleteAnswerModal, setOpenDeleteAnswerModal] = useState(false);
  const showDeleteAnswerModal = () => setOpenDeleteAnswerModal(true);
  const showDeleteQuestionModal = () => setOpenDeleteQuestionModal(true);

  const hideModal = () => {
    setOpenDeleteAnswerModal(false);
    setOpenDeleteQuestionModal(false);
  };

  const [questionId, setQuestionId] = useState("");
  const [answerId, setAnswerId] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [addingAnswer, setAddingAnswer] = useState(null);
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [newAnswerText, setNewAnswerText] = useState("");
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);

  const location = useLocation();
  const lessonId = location.pathname.split("/")[5];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questions = useSelector((state) => state?.question?.questions);

  useEffect(() => {
    dispatch(getAllQuestionByFreeLessonId(lessonId));
    dispatch(getAFreeLesson(lessonId));
  }, [dispatch, lessonId]);

  const handleClickAddQuestion = () => {
    navigate("./add-question");
  };

  const handleGenerateQuiz = () => {
    setIsGeneratingQuiz(true);
    dispatch(generateQuizQuestionsForFreeLesson(lessonId))
      .unwrap()
      .then(() => {
        toast.success("Generate Quiz successfully");
        dispatch(getAllQuestionByFreeLessonId(lessonId));
      })
      .catch((error) => {
        toast.error(
          error === "Network Error"
            ? "Error generating quiz questions"
            : "An unknown error occurred."
        );
      })
      .finally(() => {
        setIsGeneratingQuiz(false);
      });
  };

  const handleDeleteQuestion = (id) => {
    dispatch(deleteQuestion(id))
      .unwrap()
      .then(() => {
        setOpenDeleteQuestionModal(false);
        dispatch(getAllQuestionByFreeLessonId(lessonId));
      })
      .catch((error) => {
        toast.error(
          error === "Network Error"
            ? "Error adding answer"
            : "An unknown error occurred."
        );
      });
  };

  const fetchAnswersByQuestionId = (questionId) => {
    dispatch(getAllAnswerByQuestionId(questionId))
      .unwrap()
      .then((res) => {
        setAnswers(res);
        setSelectedQuestionId(questionId);
      })
      .catch((error) => {
        toast.error(
          error === "Network Error"
            ? "Error fetching answers"
            : "An unknown error occurred."
        );
      });
  };

  const handleDeleteAnswer = (answerId, questionId) => {
    console.log("QuestionId:", questionId);
    dispatch(deleteAnswer(answerId))
      .unwrap()
      .then(() => {
        dispatch(getAllQuestionByFreeLessonId(lessonId));
        fetchAnswersByQuestionId(questionId);
        setOpenDeleteAnswerModal(false);
      })
      .catch((error) => {
        toast.error(
          error === "Network Error"
            ? "Error adding answer"
            : "An unknown error occurred."
        );
      });
  };

  const handleAddAnswer = (questionId) => {
    if (!newAnswer.trim()) {
      toast.warning("Answer cannot be empty!");
      return;
    }
    setAddingAnswer(questionId);
    dispatch(createAnswer({ questionId: questionId, text: newAnswer }))
      .unwrap()
      .then(() => {
        toast.success("Answer added successfully!");
        setNewAnswer("");
        dispatch(getAllQuestionByFreeLessonId(lessonId));
        fetchAnswersByQuestionId(questionId);
      })
      .catch((error) => {
        toast.error(
          error === "Network Error"
            ? "Error adding answer"
            : "An unknown error occurred."
        );
      })
      .finally(() => setAddingAnswer(null));
  };

  const handleEditAnswer = (answerId, text) => {
    setEditingAnswerId(answerId);
    setNewAnswerText(text);
  };

  const handleSaveAnswer = (answerId, questionId) => {
    if (!newAnswerText.trim()) {
      toast.warning("Answer cannot be empty!");
      return;
    }
    const data = {
      text: newAnswerText,
      questionId: questionId,
    };
    const updateData = { id: answerId, answerData: data };
    dispatch(updateAnswer(updateData))
      .unwrap()
      .then(() => {
        toast.success("Answer updated successfully!");
        fetchAnswersByQuestionId(selectedQuestionId);
        setEditingAnswerId(null);
      })
      .catch((error) => {
        toast.error(
          error === "Network Error"
            ? "Error updating answer"
            : "An unknown error occurred."
        );
      });
  };

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <h3>Question List</h3>
        <Collapse
          accordion
          onChange={(key) => {
            if (key && key.length > 0) {
              const selectedQuestionId = key[0];
              fetchAnswersByQuestionId(selectedQuestionId);
            } else {
              setSelectedQuestionId(null);
              setAnswers([]);
            }
          }}
        >
          {questions?.length === 0 ? (
            <div style={{ padding: "20px" }}>No questions added yet.</div>
          ) : (
            questions.map((question, index) => (
              <Panel
                header={`${index + 1}. ${question?.text} ${
                  question?.rightAnswer
                }`}
                key={question?.id}
                extra={
                  <div>
                    <Link
                      className="ms-2 fs-3 text-warning bg-transparent border-0"
                      to={`./question/${question?.id}`}
                    >
                      <BiEdit />
                    </Link>
                    {(question?.answer?.length === 0) && (
                      <Button
                        className="ms-2 fs-3 text-danger bg-transparent border-0 px-0"
                        type="link"
                        icon={<AiFillDelete />}
                        onClick={() => {
                          setQuestionId(question?.id);
                          showDeleteQuestionModal();
                        }}
                      />
                    )}
                  </div>
                }
              >
                <List
                  bordered
                  dataSource={answers}
                  renderItem={(answer, idx) => (
                    <List.Item>
                      {editingAnswerId === answer?.id ? (
                        <Input
                          value={newAnswerText}
                          onChange={(e) => setNewAnswerText(e.target.value)}
                        />
                      ) : (
                        <div>{answer.text}</div>
                      )}
                      <div>
                        {editingAnswerId === answer?.id ? (
                          <Button
                            type="primary"
                            onClick={() =>
                              handleSaveAnswer(answer?.id, question?.id)
                            }
                            style={{ marginLeft: "10px" }}
                          >
                            Save
                          </Button>
                        ) : (
                          <>
                            <Button
                              type="link"
                              className="ms-2 fs-3 text-warning bg-transparent border-0"
                              icon={<BiEdit />}
                              onClick={() =>
                                handleEditAnswer(answer.id, answer.text)
                              }
                            />
                            <Button
                              className="ms-2 fs-3 text-danger bg-transparent border-0 px-0"
                              type="link"
                              icon={<AiFillDelete />}
                              onClick={() => {
                                setAnswerId(answer?.id);
                                setQuestionId(question?.id);
                                showDeleteAnswerModal();
                              }}
                            />
                          </>
                        )}
                      </div>
                    </List.Item>
                  )}
                />

                <div style={{ marginTop: "10px" }}>
                  <Input
                    placeholder="Add new answer"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    style={{ marginBottom: "10px" }}
                  />
                  <Button
                    type="primary"
                    onClick={() => handleAddAnswer(question.id)}
                    loading={addingAnswer === question.id}
                  >
                    Add Answer
                  </Button>
                </div>
              </Panel>
            ))
          )}
        </Collapse>
      </div>
      <br />
      <div className="d-flex">
        <Button
          type="primary"
          onClick={handleClickAddQuestion}
          style={{
            marginRight: 10,
            backgroundColor: "green",
            borderColor: "green",
          }}
        >
          Add Question
        </Button>
        <Button
          type="primary"
          onClick={handleGenerateQuiz}
          loading={isGeneratingQuiz}
          style={{ backgroundColor: "green", borderColor: "green" }}
        >
          Generate Quiz
        </Button>
      </div>
      <CustomModal
        hideModal={hideModal}
        open={openDeleteQuestionModal}
        performAction={() => handleDeleteQuestion(questionId)}
        title="Are you sure you want to delete this question?"
      />
      <CustomModal
        hideModal={hideModal}
        open={openDeleteAnswerModal}
        performAction={() => handleDeleteAnswer(answerId, questionId)}
        title="Are you sure you want to delete this answer?"
      />
    </>
  );
};

export default Questions;
