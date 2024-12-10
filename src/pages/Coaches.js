import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../components/CustomModal";
import { deleteCoach, getAllCoach } from "../features/admin/adminSlice";
import { format } from "date-fns";
import { toast } from "react-toastify";

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
    dispatch(getAllCoach());
  }, [dispatch]);
  const coachState = useSelector((state) => state?.admin?.coaches);
  const data = [];
  for (let i = 0; i < coachState?.length; i++) {
    data.push({
      key: i + 1,
      first_name: coachState[i]?.firstName,
      last_name: coachState[i]?.lastName,
      email: coachState[i].email,
      dob: coachState[i].dob
        ? format(new Date(coachState[i].dob), "dd/MM/yyyy")
        : format(new Date(coachState[i].created_at), "dd/MM/yyyy"),
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
  const handleDeleteCoach = (id) => {
    dispatch(deleteCoach(id))
      .unwrap()
      .then(() => {
        toast.success("Delete user successfully.");
        dispatch(getAllCoach());
      })
      .catch((error) => {
        if (error === "Request failed with status code 500") {
          toast.error("Coach deletion failed. Coach has an paid course.");
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
      <h3 className="mb-4 title">Coaches</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          handleDeleteCoach(coachId);
        }}
        title="Are you sure you want to delete this coach"
      />
    </>
  );
};

export default Coaches;
