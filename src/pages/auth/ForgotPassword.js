import React from "react";
import CustomInput from "../../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../features/auth/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ColorAccent } from "../../constant/Color";

const Forgotpassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = {
        email: values.email,
        role: "admin",
      };
      dispatch(forgotPassword(data))
        .unwrap()
        .then(() => {
          toast.success(
            "If your email is registered, you will receive a link to reset your password shortly."
          );
          navigate("/reset-password", {
            state: { email: formik.values.email },
          });
        })
        .catch((error) => {
          if (error === "Request failed with status code 404") {
            toast.error(
              "We couldn't find an account associated with that email address. Please check and try again."
            );
          } else if (error === "Network Error") {
            toast.error(
              "There was a problem with the server. Please try again later."
            );
          } else {
            toast.error("An unknown error occurred.");
          }
        });
    },
  });

  return (
    <>
      <div
        className="py-5"
        style={{ background: ColorAccent.primary, minHeight: "100vh" }}
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
          <h3 className="text-center title">Forgot password</h3>
          <p className="text-center">
            Please enter your register email to get OTP reset password.
          </p>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              label="Email Address"
              id="email"
              name="email"
              val={formik.values.email}
              onCh={formik.handleChange("email")}
            />
            <div className="error">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mb-3 text-end">
              <Link to="/login">Back to login</Link>
            </div>
            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100"
              style={{ background: ColorAccent.primary }}
              type="submit"
            >
              Send link
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forgotpassword;
