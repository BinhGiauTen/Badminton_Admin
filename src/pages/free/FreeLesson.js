import React from "react";
import editorjsHTML from "editorjs-html";
import {  useSelector } from "react-redux";
import Questions from "../../components/Questions";

const FreeLesson = () => {
  const lessonState = useSelector((state) => state?.freeLesson?.freeLesson);

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

export default FreeLesson;
