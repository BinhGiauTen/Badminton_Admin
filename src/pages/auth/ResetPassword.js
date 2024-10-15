import React, {useEffect} from "react";
import CustomInput from "../../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { resetPassword, resetState } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { passwordRegex } from "../../constant/Regex";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const schema = Yup.object().shape({
    otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required("Otp is required"),
    newPassword: Yup.string()
    .matches(passwordRegex,"New password must contain at least 8 characters, an uppercase, a number and special characters")
    .max(24, "New password cannot exceed 24 characters")
    .required("New password is required"),
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

  const { message } = useSelector((state) => state?.auth);

  useEffect(() => {
    if (message === "Update password successfully") {
      toast.success("Update password successfully !!!");
      navigate("/login");
      dispatch(resetState());
    } else if (message === "Update password fail") {
      toast.error("Update password fail !!!");
      dispatch(resetState());
    }
  }, [message, navigate, dispatch]);

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
            <div className="mb-3 text-end">
              <Link to="/forgot-password">Back to forgot Password</Link>
            </div>
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
