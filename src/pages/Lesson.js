import React from "react";
import editorjsHTML from "editorjs-html";
import { useSelector } from "react-redux";

const Lesson = () => {
  const lessonState = useSelector((state)=> state?.lesson?.freeLesson);
  console.log("LessonState:", lessonState);
  const edjsParser = editorjsHTML(); 
  const renderHtmlContent = edjsParser.parse(lessonState?.content).join("");

  return (
    <div className="rendered-content">
      <h4>Preview</h4>
      <div dangerouslySetInnerHTML={{ __html: renderHtmlContent }} />
    </div>
  );
};

export default Lesson;
