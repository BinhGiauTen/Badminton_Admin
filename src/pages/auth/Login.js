import React, {useState} from "react";
import CustomInput from "../../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { passwordRegex } from "../../constant/Regex";
import { ColorAccent } from "../../constant/Color";

const Login = () => {
  const [role, setRole] = useState("admin");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        passwordRegex,
        "New password must contain at least 8 characters, an uppercase, a number and special characters"
      )
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
        role: role,
      };
      dispatch(login(loginData))
        .unwrap()
        .then(() => {
          toast.success("An otp has been sent to your email.");
          navigate("/verify-otp", {
            state: { email: formik.values.email , role: role},
          });
        })
        .catch((error) => {
          if (error === "Request failed with status code 400") {
            toast.error("Invalid email or password.");
          } else if (error === "Request failed with status code 404") {
            toast.error("The user does not exist.");
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

  const toggleRole = () => {
    setRole((prevRole) => (prevRole === "admin" ? "coach" : "admin"));
  };

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
          <h3 className="text-center title">{role === "admin" ? "Admin Login" : "Coach Login"}</h3>
          <p className="text-center">Login to your account to continue.</p>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
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
              name="password"
              label="Password"
              id="pass"
              val={formik.values.password}
              onCh={formik.handleChange("password")}
              secure={true}
            />
            <div className="error">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="d-flex my-2 align-items-center justify-content-between">
              <div className="as-coach">
                <div
                  style={{ color: ColorAccent.primary }}
                  className="text-decoration-underline"
                  onClick={toggleRole}
                >
                  Login as {role === "admin" ? "coach" : "admin"}
                </div>
              </div>
              <div>
                <Link to="/register">Register</Link>
              </div>
            </div>

            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
              style={{ background: ColorAccent.primary }}
              type="submit"
            >
              {role === "admin" ? "Admin Login" : "Coach Login"}
            </button>
            <br/>
            <div className="text-center">
              <Link to={{ pathname: "/forgot-password", state: { role: role } }}>Forgot Password</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
