import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, resetState } from "../features/category/categorySlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";

const Categories = () => {
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
            className="ms-2 fs-3 text-warning bg-transparent border-0"
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
    </>
  );
};

export default Categories;

