import React from "react";
import { Modal } from "antd";

const CustomModal = ({ open, hideModal, performAction, title, onOkText, onCancelText }) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText={onOkText || "OK"}
      cancelText={onCancelText || "Cancel"}
    >
      <p>{title}</p>
    </Modal>
  );
};

export default CustomModal;
