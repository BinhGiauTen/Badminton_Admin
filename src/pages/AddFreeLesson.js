import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAFreeLesson,
  createFreeLesson,
  updateFreeLesson,
} from "../features/freeLesson/freeLessonSlice";
import EditorJS from "../components/Editor";

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

const AddFreeLesson = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split("/");
  const courseId = pathParts[3];
  const lessonId = pathParts[5];
  const isAddLesson = pathParts.includes("add-lesson");

  const freeLesson = useSelector((state) => state.freeLesson.freeLesson);
  const [content, setContent] = useState(INITIAL_DATA);
  const [editorKey, setEditorKey] = useState(0);


  useEffect(() => {
    if (lessonId !== undefined) {
      dispatch(getAFreeLesson(lessonId));
    }
  }, [dispatch, lessonId]);

  useEffect(() => {
    if (freeLesson?.content) {
      setContent(freeLesson.content);
      setEditorKey((prevKey) => prevKey + 1); // Change key to force EditorJS re-render
    }
  }, [freeLesson]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      freeCourseId: Number(courseId),
      content: content,
    };

    if (!isAddLesson) {
      const updateData = { id: lessonId, freeLessonData: data };
      dispatch(updateFreeLesson(updateData))
        .unwrap()
        .then(() => {
          toast.success("Free lesson updated successfully");
          navigate(`/dashboard/free-course/${courseId}/course-detail`);
        })
        .catch((error) => {
          if (error === "Request failed with status code 404") {
            toast.error(`Free lesson with id ${lessonId} not found`);
          } else if (error === "Network Error") {
            toast.error("There was a problem with the server. Please try again later.");
          } else {
            toast.error("An unknown error occurred.");
          }
        });
    } else {
      dispatch(createFreeLesson(data))
        .unwrap()
        .then(() => {
          toast.success("Free lesson created successfully");
          navigate(`/dashboard/free-course/${courseId}/course-detail`);
        })
        .catch((error) => {
          if (error === "Network Error") {
            toast.error("There was a problem with the server. Please try again later.");
          } else {
            toast.error("An unknown error occurred.");
          }
        });
      setContent(INITIAL_DATA); // Reset the editor content
      setEditorKey((prevKey) => prevKey + 1); // Reset editor key after submission
    }
  };

 

  return (
    <>
      <h3 className="mb-4 title">
        {!isAddLesson ? "Edit" : "Add"} Free Lesson
      </h3>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="editor">
            <EditorJS
              key={editorKey} // Force EditorJS re-render when content changes
              data={content}
              onChange={(value) => setContent(value)}
              editorBlock="editorjs-container"
            />
          </div>
          <br />

          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            {!isAddLesson ? "Edit" : "Add"} Free Lesson
          </button>
        </form>
      </div>
    </>
  );
};

export default AddFreeLesson;
