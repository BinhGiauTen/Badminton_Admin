import React, { useEffect, useState } from "react";
import editorjsHTML from "editorjs-html";
import { useDispatch, useSelector } from "react-redux";
import { Button, List } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  deleteQuestion,
  getAllQuestionByFreeLessonId,
} from "../../features/question/questionSlice";
import { generateQuizQuestionsForFreeLesson } from "../../features/openAi/openAiSlice";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import CustomModal from "../../components/CustomModal";
import { getAFreeLesson } from "../../features/freeLesson/freeLessonSlice";

const FreeLesson = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [questionId, setQuestionId] = useState("");
  const showModal = (e) => {
    setQuestionId(e);
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const lessonId = location.pathname.split("/")[5];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lessonState = useSelector((state) => state?.freeLesson?.freeLesson);
  const questions = useSelector((state) => state?.question?.questions);
  const edjsParser = editorjsHTML();
  const renderHtmlContent = lessonState?.content
    ? edjsParser?.parse(lessonState.content)?.join("")
    : "No content available";

  const handleClickAddQuestion = () => {
    navigate("./add-question");
  };
  const handleGenerateQuiz = () => {
    dispatch(generateQuizQuestionsForFreeLesson(lessonState?.id))
      .unwrap()
      .then(() => {
        toast.success("Generate Quiz successfully");
        dispatch(getAllQuestionByFreeLessonId(lessonState?.id));
      })
      .catch((error) => {
        if (error === "Network Error") {
          toast.error("Error generating quiz questions");
        } else {
          toast.error("An unknown error occurred.");
        }
      });
  };

  useEffect(() => {
    dispatch(getAllQuestionByFreeLessonId(lessonState?.id));
    dispatch(getAFreeLesson(lessonId));
  }, [dispatch, lessonState?.id, lessonId]);

  const delQuestion = (id) => {
    dispatch(deleteQuestion(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllQuestionByFreeLessonId(lessonState?.id));
    }, 100);
  };

  return (
    <>
      <div className="rendered-content">
        <div dangerouslySetInnerHTML={{ __html: renderHtmlContent }} />
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Question List</h3>
        {questions?.length === 0 ? (
          <p>No questions added yet.</p>
        ) : (
          <List
            bordered
            dataSource={questions}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <div style={{ flex: 1 }}>
                  {index + 1}. {item?.text}
                </div>
                <Link
                  className="ms-2 fs-3 text-warning bg-transparent border-0"
                  to={`./question/${item?.id}`}
                >
                  <BiEdit />
                </Link>
                <Button
                  className="ms-2 fs-3 text-danger bg-transparent border-0 px-0"
                  type="link"
                  icon={<AiFillDelete />}
                  onClick={() => showModal(item?.id)}
                />
              </List.Item>
            )}
          />
        )}
      </div>
      <br />
      <div className="d-flex">
        <Button
          type="primary"
          onClick={handleClickAddQuestion}
          block
          style={{
            width: "200px",
            backgroundColor: "green",
            borderColor: "green",
          }}
        >
          Add Question
        </Button>
        <Button
          type="primary"
          onClick={handleGenerateQuiz}
          className="ms-2"
          block
          style={{
            width: "200px",
            backgroundColor: "green",
            borderColor: "green",
          }}
        >
          Generate Quiz
        </Button>
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delQuestion(questionId);
        }}
        title="Are you sure you want to delete this question"
      />
    </>
  );
};

export default FreeLesson;
