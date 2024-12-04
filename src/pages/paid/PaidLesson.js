import React from "react";
import editorjsHTML from "editorjs-html";
import {  useSelector } from "react-redux";
import Questions from "../../components/Questions";

const PaidLesson = () => {
  const lessonState = useSelector((state) => state?.paidLesson?.paidLesson);

  const edjsParser = editorjsHTML();
  const renderHtmlContent = lessonState?.content
    ? edjsParser.parse(lessonState.content).join("")
    : "No content available";

  return (
    <>
      <div className="rendered-content">
        <div dangerouslySetInnerHTML={{ __html: renderHtmlContent }} />
      </div>
      <Questions/>
    </>
  );
};

export default PaidLesson;
