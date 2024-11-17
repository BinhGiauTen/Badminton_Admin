import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const CustomInput = (props) => {
  const { label, i_id, i_class, name, val, onCh, onBl, secure } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="form-floating mt-3 position-relative">
      <input
        type={secure && !isPasswordVisible ? "password" : "text"}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={val}
        onChange={onCh}
        onBlur={onBl}
      />
      <label htmlFor={i_id}>{label}</label>

      {secure && (
        <div
          onClick={togglePasswordVisibility}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "#6c757d"
          }}
        >
          {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
