import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import {
  deleteFreeCourse,
  getAllFreeCourse,
} from "../features/freeCourse/freeCourseSlice";
import CustomModal from "../components/CustomModal";

const FreeCourseTable = () => {
  const [open, setOpen] = useState(false);
  const [freeCourseId, setFreeCourseId] = useState("");
  const dispatch = useDispatch();

  const showModal = (id) => {
    setFreeCourseId(id);
    setOpen(true);
  };
  const hideModal = () => setOpen(false);

  useEffect(() => {
    dispatch(getAllFreeCourse());
  }, [dispatch]);

  const freeCourseState = useSelector(
    (state) => state.freeCourse.freeCourses.data
  );
  const dataFree = freeCourseState?.map((course, index) => ({
    key: index + 1,
    name: course.name,
    description: course.description,
    thumbnail: course.thumbnail,
    lessonQuantity: course.lessonQuantity,
    categoryId: course.categoryId,
    type: course.type,
    action: (
      <>
        <Link
          className="ms-2 fs-3 text-danger bg-transparent border-0"
          to={`/dashboard/free-course/${course.id}`}
        >
          <BiEdit />
        </Link>
        <button
          className="ms-2 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(course.id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  const handleDeleteFreeCourse = () => {
    dispatch(deleteFreeCourse(freeCourseId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllFreeCourse());
    }, 100);
  };

  const columns = [
    { title: "SNo", dataIndex: "key" },
    { title: "Name", dataIndex: "name" },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => (
        <Tooltip title={text}>
          {text.length > 40 ? `${text.slice(0, 40)}...` : text}
        </Tooltip>
      ),
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      render: (text) => (
        <Tooltip title={text}>
          {text.length > 40 ? `${text.slice(0, 40)}...` : text}
        </Tooltip>
      ),
    },
    { title: "Lesson Quantity", dataIndex: "lessonQuantity" },
    { title: "CategoryId", dataIndex: "categoryId" },
    { title: "Type", dataIndex: "type" },
    { title: "Action", dataIndex: "action", width: "150px" },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataFree} />
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={handleDeleteFreeCourse}
        title="Are you sure you want to delete this free course?"
      />
    </>
  );
};

export default FreeCourseTable;
