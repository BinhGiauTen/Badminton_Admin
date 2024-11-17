import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../components/CustomModal";
import { getAllCategory, resetState } from "../features/category/categorySlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";

const Categories = () => {
  // const [open, setOpen] = useState(false);
  // const [categoryId, setCategoryId] = useState("");
  // const showModal = (e) => {
  //   setCategoryId(e);
  //   setOpen(true);
  // };
  // const hideModal = () => {
  //   setOpen(false);
  // };
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Category Name",
      dataIndex: "category_name",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllCategory());
  }, [dispatch]);
  const categoryState = useSelector((state) => state.category.categories);
  const data = [];
  for (let i = 0; i < categoryState.length; i++) {
    data.push({
      key: i + 1,
      category_name: categoryState[i]?.name,
      action: (
        <>
          <Link
            className="ms-2 fs-3 text-danger bg-transparent border-0"
            to={`/dashboard/category/${categoryState[i]?.id}`}
          >
            <BiEdit />
          </Link>
        </>
      ),
    });
  }
  return (
    <>
      <h3 className="mb-4 title">Categories</h3>
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

export default Categories;

