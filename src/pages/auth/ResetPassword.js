import React from "react";
import CustomInput from "../../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { resetPassword } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { passwordRegex } from "../../constant/Regex";
import { ColorAccent } from "../../constant/Color";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const role = location.state?.role;

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
        role: role,
      };
      dispatch(resetPassword(data)).unwrap()
      .then(() => {
        toast.success("Your password has been reset successfully.")
        navigate("/login");
      })
      .catch((error) => {
        if (error === "Request failed with status code 400") {
          toast.error("The OTP you entered is incorrect. Please try again.")
        } else if (error === "Request failed with status code 404") {
          toast.error("No account associated with this information was found. Please check and try again.")
        } else if (error === "Network Error") {
          toast.error("There was a problem with the server. Please try again later.")
        } else {
          toast.error("An unknown error occurred.")
        }
      });
    },
  });

  return (
    <>
      <div
        className="py-5"
        style={{
          backgroundImage: `url('/images/bg.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
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
              label="New Password"
              id="newPassword"
              name="newPassword"
              val={formik.values.newPassword}
              onCh={formik.handleChange("newPassword")}
              secure={true}
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
              style={{ background: ColorAccent.primary }}
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
