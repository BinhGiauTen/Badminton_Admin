import React, { useEffect } from "react";
import { Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { IoIosMore } from "react-icons/io";

import {
  getAllPaidCourse,
  getPaidCourseByCoachId,
} from "../features/paidCourse/paidCourseSlice";

const PaidCourseTable = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state?.user?.user);

  useEffect(() => {
    if (userState?.role === "admin") {
      dispatch(getAllPaidCourse());
    } else {
      dispatch(getPaidCourseByCoachId(userState?.id));
    }
  }, [dispatch, userState?.role, userState?.id]);

  const paidCourseState = useSelector(
    (state) => state?.paidCourse?.paidCourses?.data
  );
  const dataPaid = paidCourseState?.map((course, index) => ({
    key: index + 1,
    name: course?.name,
    description: course?.description,
    thumbnail: course?.thumbnail,
    lessonQuantity: course?.lessonQuantity,
    price: course?.price,
    categoryId: course?.categoryId,
    type: course?.type,
    action: (
      <>
        <Link
          className="ms-2 fs-3 text-info bg-transparent border-0"
          to={`/dashboard/paid-course/${course.id}/course-detail`}
        >
          <IoIosMore />
        </Link>
        <Link
          className="ms-2 fs-3 text-warning bg-transparent border-0"
          to={`/dashboard/paid-course/${course.id}`}
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
    { title: "Price", dataIndex: "price" },
    { title: "CategoryId", dataIndex: "categoryId" },
    { title: "Type", dataIndex: "type" },
    { title: "Action", dataIndex: "action", width: "150px" },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataPaid}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};

export default PaidCourseTable;
