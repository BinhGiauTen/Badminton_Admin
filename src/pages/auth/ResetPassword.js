import React from "react";
import CustomInput from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();

  const handleVerifyOTP = () => {
    navigate("/");
  };

  return (
    <>
      <div
        className="py-5"
        style={{ background: "#ffd333", minHeight: "100vh" }}
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
          <h3 className="text-center title">OTP Verification</h3>
          <p className="text-center">
            Please enter the One Time Passcode (OTP) sent to your email address and new password.
          </p>
          <form action="">
            <CustomInput type="text" label="OTP Code" id="otp" />
            <CustomInput type="password" label="New Password" id="password" />
            <br />
            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100"
              style={{ background: "#ffd333" }}
              type="submit"
              onClick={() => handleVerifyOTP()}
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
