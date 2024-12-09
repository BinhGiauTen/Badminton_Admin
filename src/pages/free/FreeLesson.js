import React from "react";
import { useSelector } from "react-redux";
import Questions from "../../components/Questions";

const FreeLesson = () => {
  const lessonState = useSelector((state) => state?.freeLesson?.freeLesson);

  const renderBlock = (block) => {
    const renderText = (text) => {
      return { __html: text };
    };

    switch (block.type) {
      case "header":
        return (
          <h2
            style={{
              textAlign: block.tunes?.textAlignment?.alignment || "left",
            }}
            dangerouslySetInnerHTML={renderText(block.data.text)}
          />
        );
      case "paragraph":
        return (
          <p
            style={{ textAlign: block.tunes?.textAlignment?.alignment || "left" }}
            dangerouslySetInnerHTML={renderText(block.data.text)}
          />
        );
      case "video":
        return (
          <div className="video-container">
            <video controls>
              <source src={block.data.file.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case "list":
        return (
          <ul>
            {block.data.items.map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={renderText(item)} />
            ))}
          </ul>
        );
      case "checklist":
        return (
          <ul>
            {block.data.items.map((item, index) => (
              <li key={index}>
                <input type="checkbox" checked={item.checked} readOnly />
                <span dangerouslySetInnerHTML={renderText(item.text)} />
              </li>
            ))}
          </ul>
        );
      case "image":
        return (
          <figure>
            <img
              src={block.data.file.url}
              alt={block.data.caption || "Image"}
              style={{ maxWidth: "100%" }}
            />
          </figure>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="rendered-content">
        {lessonState?.content ? (
          lessonState.content.blocks.map((block) => renderBlock(block))
        ) : (
          <p>No content available</p>
        )}
      </div>
      <Questions />
    </>
  );
};

export default FreeLesson;
