import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { getAllFreeCourse } from "../features/freeCourse/freeCourseSlice";

const FreeCourses = () => {
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
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
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
        </>
      ),
    });
  }
  return (
    <>
      <h3 className="mb-4 title">Free Courses</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      {/* <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delCoach(coachId);
        }}
        title="Are you sure you want to delete this coach"
      /> */}
    </>
  );
};

export default FreeCourses;
