import React from "react";
import editorjsHTML from "editorjs-html";
import { useSelector } from "react-redux";

const PaidLesson = () => {
  const lessonState = useSelector((state)=> state?.paidLesson?.paidLesson);
  const edjsParser = editorjsHTML(); 
  const renderHtmlContent = edjsParser.parse(lessonState?.content).join("");

  return (
    <div className="rendered-content">
      <div dangerouslySetInnerHTML={{ __html: renderHtmlContent }} />
    </div>
  );
};

export default PaidLesson;
