import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { deleteFreeCourse, getAllFreeCourse } from "../features/freeCourse/freeCourseSlice";
import CustomModal from "../components/CustomModal";
import { AiFillDelete } from "react-icons/ai";


const FreeCourses = () => {
  const [open, setOpen] = useState(false);
  const [freeCourseId, setFreeCourseId] = useState("");
  const showModal = (e) => {
    setFreeCourseId(e);
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
      title: "Name",
      dataIndex: "name",
    },
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
      // render: (url) => (
      //   <img src={url} alt="thumbnail" style={{ maxWidth: "80px", maxHeight: "80px" }} />
      // ),
      render: (text) => (
        <Tooltip title={text}>
          {text.length > 40 ? `${text.slice(0, 40)}...` : text}
        </Tooltip>
      ),
    },
    {
      title: "Lession Quantity",
      dataIndex: "lessonQuantity",
    },
    {
      title: "CategoryId",
      dataIndex: "categoryId",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "150px",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFreeCourse());
  }, [dispatch]);
  const freeCourseState = useSelector((state) => state.freeCourse.freeCourses.data);
  const data = [];
  for (let i = 0; i < freeCourseState?.length; i++) {
    data.push({
      key: i + 1,
      name: freeCourseState[i]?.name,
      description: freeCourseState[i]?.description,
      thumbnail: freeCourseState[i]?.thumbnail,
      lessonQuantity: freeCourseState[i]?.lessonQuantity,
      categoryId: freeCourseState[i]?.categoryId,
      type: freeCourseState[i]?.type,
      action: (
        <>
          <Link
            className="ms-2 fs-3 text-danger bg-transparent border-0"
            to={`/free-course/${freeCourseState[i]?.id}`}
          >
            <BiEdit />
          </Link>
          <button
            className="ms-2 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(freeCourseState[i].id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const handleDeleteFreeCourse = (e) => {
    dispatch(deleteFreeCourse(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllFreeCourse());
    }, 100);
  };


  return (
    <>
      <h3 className="mb-4 title">Free Courses</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          handleDeleteFreeCourse(freeCourseId);
        }}
        title="Are you sure you want to delete this free course"
      />
    </>
  );
};

export default FreeCourses;
