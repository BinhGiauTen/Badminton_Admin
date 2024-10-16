import React, { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login, resetState } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { passwordRegex } from "../../constant/Regex";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is required"),
    password: Yup.string()
    .matches(passwordRegex,"New password must contain at least 8 characters, an uppercase, a number and special characters")
    .max(24, "Password cannot exceed 24 characters")
    .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const loginData = {
        ...values,
        role: "admin",
      };
      dispatch(login(loginData));
    },
  });
  const { message } = useSelector((state) => state?.auth);

  useEffect(() => {
    if (message === "Login successful") {
      toast.success("Login successful !!!");
      navigate("/");
    } else if (message === "Login fail") {
      toast.error("Login fail !!!");
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
          <h3 className="text-center title">Login</h3>
          <p className="text-center">Login to your account to continue.</p>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              name="email"
              label="Email Address"
              id="email"
              val={formik.values.email}
              onCh={formik.handleChange("email")}
            />
            <div className="error">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
            <CustomInput
              type="password"
              name="password"
              label="Password"
              id="pass"
              val={formik.values.password}
              onCh={formik.handleChange("password")}
            />
            <div className="error">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="mb-3 text-end">
              <Link to="/forgot-password">Forgot Password</Link>
            </div>
            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
              style={{ background: "#ffd333" }}
              type="submit"
            >
              Login{" "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
