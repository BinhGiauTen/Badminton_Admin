import React, { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createQuestionForFreeLesson,
  getQuestionById,
  resetState,
  updateQuestionForFreeLesson,
} from "../../features/question/questionSlice";

let schema = yup.object().shape({
  text: yup.string().required("Question is required"),
  rightAnswer: yup.string().required("Right answer is required"),
});

const AddFreeQuestion = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.pathname.split("/")[3];
  const lessonId = location.pathname.split("/")[5];
  const getQuestionId = location.pathname.split("/")[7];
  const question = useSelector((state)=> state.question.question);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      text: question?.text || "",
      rightAnswer: question?.rightAnswer || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const questionData = {
        ...values,
        freeLessonId: Number(lessonId),
      };
      if (getQuestionId !== undefined) {
        dispatch(updateQuestionForFreeLesson({id: getQuestionId , questionData: questionData}))
          .unwrap()
          .then(() => {
            toast.success("Question has been updated");
            navigate(`/dashboard/free-course/${courseId}/preview-lesson/${lessonId}`);
          })
          .catch((error) => {
            if (error === "Request failed with status code 404") {
              toast.error(`Question with id ${getQuestionId} not found`);
            } else if (error === "Network Error") {
              toast.error(
                "There was a problem with the server. Please try again later."
              );
            } else {
              toast.error("An unknown error occurred.");
            }
          });
      }else{
        dispatch(createQuestionForFreeLesson(questionData))
          .unwrap()
          .then(() => {
            toast.success("Question has been added");
            navigate(`/dashboard/free-course/${courseId}/preview-lesson/${lessonId}`);
          })
          .catch((error) => {
            if (error === "Request failed with status code 404") {
              toast.error("Free lesson not found");
            } else if (error === "Network Error") {
              toast.error(
                "There was a problem with the server. Please try again later."
              );
            } else {
              toast.error("An unknown error occurred.");
            }
          });
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (getQuestionId !== undefined) {
      dispatch(getQuestionById(getQuestionId));
    } else {
      dispatch(resetState());
    }
  }, [getQuestionId, dispatch]);

  return (
    <>
    <h3 className="mb-4 title">
        {getQuestionId !== undefined ? "Edit" : "Add"} question
      </h3>
      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Question"
            name="text"
            id="text"
            onCh={formik.handleChange("text")}
            onBl={formik.handleBlur("text")}
            val={formik.values.text}
          />
          <div className="error">
            {formik.touched.text && formik.errors.text ? (
              <div>{formik.errors.text}</div>
            ) : null}
          </div>

          <CustomInput
            type="text"
            label="Right answer"
            name="rightAnswer"
            id="rightAnswer"
            onCh={formik.handleChange("rightAnswer")}
            onBl={formik.handleBlur("rightAnswer")}
            val={formik.values.rightAnswer}
          />
          <div className="error">
            {formik.touched.rightAnswer && formik.errors.rightAnswer ? (
              <div>{formik.errors.rightAnswer}</div>
            ) : null}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            {getQuestionId !== undefined ? "Edit" : "Add"} Question
          </button>
        </form>
      </div>
    </>
  );
};
export default AddFreeQuestion;
