import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { memo } from "react";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Underline from "@editorjs/underline";
import ChangeCase from "editorjs-change-case";
import Strikethrough from "@sotaproject/strikethrough";
import Checklist from "@editorjs/checklist";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import AlignmentBlockTune from "editorjs-text-alignment-blocktune";
import ImageTool from "@editorjs/image";
import { useDispatch } from "react-redux";
import { uploadImageLesson } from "../features/freeLesson/freeLessonSlice";

const Editor = ({ data, onChange, editorBlock }) => {
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorBlock,
        data: data,
        tools: {
          textAlignment: {
            class: AlignmentBlockTune,
            config: {
              default: "left",
              blocks: {
                header: "center",
              },
            },
          },
          paragraph: {
            class: Paragraph,
            tunes: ["textAlignment"],
          },
          header: {
            class: Header,
            inlineToolbar: true,
            tunes: ["textAlignment"],
            config: {
              placeholder: "Enter a Header",
              levels: [1, 2, 3, 4, 5],
              defaultLevel: 2,
            },
          },
          list: {
            class: List,
            config: {
              defaultStyle: "unordered",
            },
          },
          checklist: {
            class: Checklist,
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile(file) {
                  return dispatch(uploadImageLesson(file)).then(
                    (response) => {
                      if (response) {
                        return {
                          success: 1,
                          file: {
                            url: response.payload.data,
                          },
                        };
                      } else {
                        return { success: 0 };
                      }
                    }
                  );
                },
              },
            },
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                codepen: true,
              },
            },
          },
          underline: {
            class: Underline,
          },
          strikethrough: {
            class: Strikethrough,
          },
          Marker: {
            class: Marker,
          },
          inlineCode: {
            class: InlineCode,
          },
          changeCase: {
            class: ChangeCase,
          },
        },
        async onChange(api, event) {
          const savedData = await api.saver.save();
          onChange(savedData); 
        },
      });
      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return <div id={editorBlock}></div>;
};

export default memo(Editor);
