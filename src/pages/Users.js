import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../components/CustomModal";
import { deleteUser, getAllUser, resetState } from "../features/admin/adminSlice";
import { toast } from "react-toastify";

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
    dispatch(getAllUser());
  }, [dispatch]);
  const userState = useSelector((state) => state?.admin?.users);
  const data = [];
  for (let i = 0; i < userState?.length; i++) {
    data.push({
      key: i + 1,
      first_name: userState[i]?.firstName,
      last_name: userState[i]?.lastName,
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
  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id))
    .unwrap()
    .then(() => {
      toast.success("Delete user successfully.");
      dispatch(getAllUser());
    })
    .catch((error) => {
      if (error === "Request failed with status code 500") {
        toast.error("User deletion failed. User has an order.");
        setOpen(false);
      } else if (error === "Network Error") {
        toast.error("There was a server problem. Please try later.");
      } else {
        toast.error("An unknown error occurred.");
      }
    });
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
          handleDeleteUser(userId);
        }}
        title="Are you sure you want to delete this user"
      />
    </>
  );
};

export default Users;
