import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Form, Radio } from "antd";
import { updateAdmin, updateAdminAvatar } from "../features/admin/adminSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const ProfileModal = ({ open, onClose, user }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
    description: user?.description || "",
    avatar: user?.avatar || ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        gender: user.gender || "",
        dob: user.dob || "",
        description: user.description || "",
        avatar: user.avatar || ""
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const payload = {
      id: user.id,
      file: selectedFile,
    };
    dispatch(updateAdminAvatar(payload))
      .unwrap()
      .then(() => {
        toast.success("Updated avatar successfully.");
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
  };
  const handleSubmit = () => {
    console.log("Data:", formData);
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
        <Form.Item label="Description">
          <Input.TextArea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </Form.Item>
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
