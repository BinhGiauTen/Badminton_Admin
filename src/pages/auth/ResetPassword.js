import React from "react";
import CustomInput from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { resetPassword } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const schema = Yup.object().shape({
    otp: Yup.string().required("otp is required"),
    newPassword: Yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      otp: "",
      newPassword: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = {
        ...values,
        email: email,
        role: "admin",
      };
      dispatch(resetPassword(data));
    },
  });

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
            Please enter the One Time Passcode (OTP) sent to your email address
            and new password.
          </p>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              label="OTP Code"
              id="otp"
              name="otp"
              val={formik.values.otp}
              onCh={formik.handleChange("otp")}
            />
            <div className="error">
              {formik.touched.otp && formik.errors.otp ? (
                <div>{formik.errors.otp}</div>
              ) : null}
            </div>
            <CustomInput
              type="password"
              label="New Password"
              id="newPassword"
              name="newPassword"
              val={formik.values.newPassword}
              onCh={formik.handleChange("newPassword")}
            />
            <div className="error">
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div>{formik.errors.newPassword}</div>
              ) : null}
            </div>
            <br />
            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100"
              style={{ background: "#ffd333" }}
              type="submit"
            >
              Comfirm
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
