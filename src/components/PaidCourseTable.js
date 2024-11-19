import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import {
  deletePaidCourse,
  getAllPaidCourse,
} from "../features/paidCourse/paidCourseSlice";
import CustomModal from "../components/CustomModal";

const PaidCourseTable = () => {
  const [open, setOpen] = useState(false);
  const [paidCourseId, setPaidCourseId] = useState("");
  const dispatch = useDispatch();

  const userState = useSelector((state) => state?.user?.user);

  const showModal = (id) => {
    setPaidCourseId(id);
    setOpen(true);
  };
  const hideModal = () => setOpen(false);

  useEffect(() => {
    dispatch(getAllPaidCourse());
  }, [dispatch]);

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
          className="ms-2 fs-3 text-danger bg-transparent border-0"
          to={`/dashboard/paid-course/${course.id}`}
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

  const handleDeletePaidCourse = () => {
    dispatch(
      deletePaidCourse({ paidCourseId: paidCourseId, coachId: userState.id })
    );
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllPaidCourse());
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
    { title: "Price", dataIndex: "price" },
    { title: "CategoryId", dataIndex: "categoryId" },
    { title: "Type", dataIndex: "type" },
    { title: "Action", dataIndex: "action", width: "150px" },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataPaid} />
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={handleDeletePaidCourse}
        title="Are you sure you want to delete this paid course?"
      />
    </>
  );
};

export default PaidCourseTable;
