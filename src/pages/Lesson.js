import React from "react";
import editorjsHTML from "editorjs-html";
import { useSelector } from "react-redux";

const Lesson = () => {
  const lessonState = useSelector((state)=> state?.freeLesson?.freeLesson);
  const edjsParser = editorjsHTML(); 
  const renderHtmlContent = edjsParser.parse(lessonState?.content).join("");

  return (
    <div className="rendered-content">
      <div dangerouslySetInnerHTML={{ __html: renderHtmlContent }} />
    </div>
  );
};

export default Lesson;
