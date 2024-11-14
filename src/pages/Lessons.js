import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { deleteFreeLesson, getAFreeLesson } from "../features/lesson/lessonSlice";
import CustomModal from "../components/CustomModal";
import { AiFillDelete } from "react-icons/ai";

const Lessons = () => {
  const [open, setOpen] = useState(false);
  const [freeLessonId, setFreeLessonId] = useState("");
  const showModal = (e) => {
    setFreeLessonId(e);
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Content",
      dataIndex: "content",
    },
    {
      title: "Course Id",
      dataIndex: "freeCourseId",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAFreeLesson(2));
  }, [dispatch]);
  const freeLessonState = useSelector((state) => state.lesson?.freeLesson);

  // const data = [];
  // for (let i = 0; i < freeLessonState?.length; i++) {
  //   data.push({
  //     key: i + 1,
  //     content: freeLessonState[i]?.content,
  //     freeCourseId: freeLessonState[i]?.freeCourseId,
  //     action: (
  //       <>
  //         <Link
  //           className="ms-2 fs-3 text-danger bg-transparent border-0"
  //           to={`/free-lesson/${freeLessonState[i]?.id}`}
  //         >
  //           <BiEdit />
  //         </Link>
  //       </>
  //     ),
  //   });
  // }

  const data = freeLessonState
    ? [
        {
          key: 1,
          content: freeLessonState.content,
          freeCourseId: freeLessonState.freeCourseId,
          action: (
            <>
              <Link
                className="ms-2 fs-3 text-danger bg-transparent border-0"
                to={`/free-lesson/${freeLessonState.id}`}
              >
                <BiEdit />
              </Link>
              <button
                className="ms-2 fs-3 text-danger bg-transparent border-0"
                onClick={() => showModal(freeLessonState.id)}
              >
                <AiFillDelete />
              </button>
            </>
          ),
        },
      ]
    : [];

    const handleDeleteFreeeLesson = (e) => {
      dispatch(deleteFreeLesson(e));
      setOpen(false);
      setTimeout(() => {
        dispatch(getAFreeLesson(2));
      }, 100);
    };

  return (
    <>
      <h3 className="mb-4 title">Free Lessons</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          handleDeleteFreeeLesson(freeLessonId);
        }}
        title="Are you sure you want to delete this free lesson"
      />
    </>
  );
};

export default Lessons;
