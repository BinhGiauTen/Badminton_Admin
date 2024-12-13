import React from "react";
import { Modal, Avatar, List } from "antd";

const UserModal = ({ open, onClose, users }) => {
  const defaultAvatar = "/images/default.png";
  return (
    <Modal
      title="Users"
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={user.avatar || defaultAvatar} />}
              title={user.firstName + " " + user.lastName}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default UserModal;
