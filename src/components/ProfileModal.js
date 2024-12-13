import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Form, Radio } from "antd";
import { updateAdmin, updateAdminAvatar } from "../features/admin/adminSlice";
import { updateCoach, updateCoachAvatar } from "../features/coach/coachSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromSecureStore } from "../features/user/userSlice";

const ProfileModal = ({ open, onClose }) => {
  const userState = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: userState?.firstName || "",
    lastName: userState?.lastName || "",
    gender: userState?.gender || "",
    dob: userState?.dob || "",
    description: userState?.description || "",
    avatar: userState?.avatar || "",
  });

  useEffect(() => {
    if (userState) {
      setFormData({
        firstName: userState.firstName || "",
        lastName: userState.lastName || "",
        gender: userState.gender || "",
        dob: userState.dob || "",
        description: userState.description || "",
        avatar: userState.avatar || "",
      });
    }
  }, [userState]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && userState?.role === "admin") {
      const payload = {
        id: userState.id,
        file: selectedFile,
      };
      dispatch(updateAdminAvatar(payload))
        .unwrap()
        .then(() => {
          toast.success("Updated avatar successfully.");
          dispatch(loadUserFromSecureStore());
        })
        .catch((error) => {
          if (error === "Request failed with status code 404") {
            toast.error("Update avatar fail. Please try again.");
          } else if (error === "Network Error") {
            toast.error("There was a server problem. Please try later.");
          } else {
            toast.error("An unknown error occurred.");
          }
        });
    } else {
      const payload = {
        id: userState.id,
        file: selectedFile,
      };
      dispatch(updateCoachAvatar(payload))
        .unwrap()
        .then(() => {
          toast.success("Updated avatar successfully.");
          dispatch(loadUserFromSecureStore());
        })
        .catch((error) => {
          if (error === "Request failed with status code 404") {
            toast.error("Update avatar fail. Please try again.");
          } else if (error === "Network Error") {
            toast.error("There was a server problem. Please try later.");
          } else {
            toast.error("An unknown error occurred.");
          }
        });
    }
  };
  const handleSubmit = () => {
    const userData = {
      ...formData,
      email: userState?.email,
    };
    if (userState?.role === "admin") {
      dispatch(updateAdmin({ id: userState?.id, userData: userData }))
        .unwrap()
        .then(() => {
          toast.success("Updated user successfully.");
          dispatch(loadUserFromSecureStore());
        })
        .catch((error) => {
          if (error === "Request failed with status code 404") {
            toast.error("Update user fail. Please try again.");
          } else if (error === "Network Error") {
            toast.error("There was a server problem. Please try later.");
          } else {
            toast.error("An unknown error occurred.");
          }
        });
    } else {
      dispatch(updateCoach({ id: userState?.id, userData: userData }))
        .unwrap()
        .then(() => {
          toast.success("Updated user successfully.");
          dispatch(loadUserFromSecureStore());
        })
        .catch((error) => {
          if (error === "Request failed with status code 404") {
            toast.error("Update user fail. Please try again.");
          } else if (error === "Network Error") {
            toast.error("There was a server problem. Please try later.");
          } else {
            toast.error("An unknown error occurred.");
          }
        });
    }
  };

  return (
    <Modal title="Profile Details" open={open} onCancel={onClose} footer={null}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <div style={{ textAlign: "center" }}>
          <img
            src={formData.avatar || "https://via.placeholder.com/100"}
            alt="Avatar"
            style={{
              borderRadius: "50%",
              marginBottom: 20,
              width: 100,
              height: 100,
            }}
          />
        </div>
        <input
          style={{ marginLeft: "10px" }}
          type="file"
          onChange={handleFileChange}
        />
        <Form.Item label="First Name" style={{ marginBottom: "5px" }}>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Last Name" style={{ marginBottom: "5px" }}>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Gender" style={{ marginBottom: "5px" }}>
          <Radio.Group
            name="gender"
            value={formData.gender}
            onChange={handleGenderChange}
          >
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
            <Radio value="Other">Other</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Date of Birth" style={{ marginBottom: "5px" }}>
          <Input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
          />
        </Form.Item>
        {userState?.role === "coach" && (
          <Form.Item label="Description">
            <Input.TextArea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              autoSize={{ minRows: 4, maxRows: 4 }}
            />
          </Form.Item>
        )}
        <br />
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProfileModal;
