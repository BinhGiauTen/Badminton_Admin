import React, { useEffect} from "react";
import { Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { IoIosMore } from "react-icons/io";
import {
  getAllFreeCourse,
} from "../features/freeCourse/freeCourseSlice";

const FreeCourseTable = () => {
  const userState = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userState?.role === "admin") {
      dispatch(getAllFreeCourse());
    }
  }, [dispatch, userState?.role]);

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
          className="ms-2 fs-3 text-info bg-transparent border-0"
          to={`/dashboard/free-course/${course.id}/course-detail`}
        >
          <IoIosMore />
        </Link>
        <Link
          className="ms-2 fs-3 text-warning bg-transparent border-0"
          to={`/dashboard/free-course/${course.id}`}
        >
          <BiEdit />
        </Link>
      </>
    ),
  }));

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
        <img
          src={text}
          alt="Thumbnail"
          style={{ width: "150px", height: "auto" }}
        />
      ),
    },
    { title: "Lesson Quantity", dataIndex: "lessonQuantity" },
    { title: "CategoryId", dataIndex: "categoryId" },
    { title: "Type", dataIndex: "type" },
    { title: "Action", dataIndex: "action", width: "150px" },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataFree}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};

export default FreeCourseTable;
