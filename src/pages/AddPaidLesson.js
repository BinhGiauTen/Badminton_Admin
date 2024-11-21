import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createFreeLesson,
  updateFreeLesson,
} from "../features/lesson/lessonSlice";
import { getAllFreeCourse } from "../features/freeCourse/freeCourseSlice";
import EditorJS from "../components/Editor";

let schema = yup.object().shape({
  content: yup.mixed().required("Content is required"),
  freeCourseId: yup.number().required("Free Course Id is required"),
});

const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "Your lesson name",
        level: 2,
      },
    },
  ],
};

const AddPaidLesson = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split("/");
  console.log("Path:", pathParts);

  const lessonId = pathParts[3];
  const isAddLesson = pathParts.includes("add-lesson");

  const freeCourseState = useSelector(
    (state) => state.freeCourse.freeCourses.data
  );
  const freeLesson = useSelector((state) => state.lesson.freeLesson);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      content: freeLesson?.content || INITIAL_DATA,
      freeCourseId: freeLesson?.freeCourseId || 0,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = {
        freeCourseId: Number(values.freeCourseId),
        content: values.content,
      };
      if (!isAddLesson) {
        const updateData = { id: lessonId, freeLessonData: data };
        dispatch(updateFreeLesson(updateData))
          .unwrap()
          .then(() => {
            toast.success("Free lesson updated successfully");
            navigate("/lessons");
          })
          .catch((error) => {
            if (error === "Request failed with status code 404") {
              toast.error(`Free lesson with id ${lessonId} not found`);
            } else if (error === "Network Error") {
              toast.error(
                "There was a problem with the server. Please try again later."
              );
            } else {
              toast.error("An unknown error occurred.");
            }
          });
      } else {
        console.log("Data:", data);
        dispatch(createFreeLesson(data))
          .unwrap()
          .then(() => {
            toast.success("Free lesson created successfully");
            navigate("/lessons");
          })
          .catch((error) => {
            if (error === "Network Error") {
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
    dispatch(getAllFreeCourse());
  }, [dispatch]);

  return (
    <>
      <h3 className="mb-4 title">
        {isAddLesson ? "Add" : "Edit"} Paid Lesson
      </h3>
      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="editor">
            <EditorJS
              data={formik.values.content}  
              onChange={(value) => formik.setFieldValue("content", value)}
              editorBlock="editorjs-container"
            />
          </div>
          <br />

          <select
            name="freeCourseId"
            onChange={formik.handleChange("freeCourseId")}
            onBlur={formik.handleBlur("freeCourseId")}
            value={formik.values.freeCourseId}
            className="form-control py-3 mb-3"
            id="freeCourseId"
          >
            <option value="">Select Free Course</option>
            {freeCourseState?.map((i, j) => {
              return (
                <option key={j} value={i.id}>
                  {i.name}
                </option>
              );
            })}
          </select>

          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            {isAddLesson ? "Add" : "Edit"} Paid Lesson
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPaidLesson;
