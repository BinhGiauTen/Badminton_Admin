import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../components/CustomModal";
import { deleteCoach, getAllCoach } from "../features/admin/adminSlice";

const Coaches = () => {
  const [open, setOpen] = useState(false);
  const [coachId, setCoachId] = useState("");
  const showModal = (e) => {
    setCoachId(e);
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
    },{
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
    dispatch(getAllCoach());
  }, [dispatch]);
  const coachState = useSelector((state) => state?.admin?.coaches);
  const data = [];
  for (let i = 0; i < coachState?.length; i++) {
    data.push({
      key: i + 1,
      first_name: coachState[i]?.first_name,
      last_name: coachState[i]?.last_name,
      email: coachState[i].email,
      dob: coachState[i].dob,
      gender: coachState[i].gender,
      action: (
        <>
          <button
            className="ms-2 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(coachState[i]?.id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const delCoach = (id) => {
    dispatch(deleteCoach(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllCoach());
    }, 100);
  };
  return (
    <>
      <h3 className="mb-4 title">Coaches</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delCoach(coachId);
        }}
        title="Are you sure you want to delete this coach"
      />
    </>
  );
};

export default Coaches;

