import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../components/CustomModal";
import { deleteUser, getAllUser, resetState } from "../features/admin/adminSlice";

const Users = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const showModal = (e) => {
    setUserId(e);
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
      title: "First Name",
      dataIndex: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Date of birth",
      dataIndex: "dob",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(resetState());
    dispatch(getAllUser());
  }, [dispatch]);
  const userState = useSelector((state) => state?.admin?.users);
  const data = [];
  for (let i = 0; i < userState?.length; i++) {
    data.push({
      key: i + 1,
      first_name: userState[i]?.first_name,
      last_name: userState[i]?.last_name,
      email: userState[i]?.email,
      dob: userState[i]?.dob,
      gender: userState[i]?.gender,
      action: (
        <>
          <button
            className="ms-2 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(userState[i]?.id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const delUser = (id) => {
    dispatch(deleteUser(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllUser());
    }, 100);
  };
  return (
    <>
      <h3 className="mb-4 title">Users</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delUser(userId);
        }}
        title="Are you sure you want to delete this user"
      />
    </>
  );
};

export default Users;
