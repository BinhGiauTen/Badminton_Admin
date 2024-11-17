import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { passwordRegex, usernameRegex } from "../../constant/Regex";
import { ColorAccent } from "../../constant/Color";

const Register = () => {
  const [role, setRole] = useState("admin");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    firstName: Yup.string()
      .matches(usernameRegex, "First name can only include letters")
      .required("First Name is required"),
    lastName: Yup.string()
      .matches(usernameRegex, "Last name can only include letters")
      .required("Last Name is required"),
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        passwordRegex,
        "Password must contain at least 8 characters, an uppercase, a number and special characters"
      )
      .max(24, "Password cannot exceed 24 characters")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const registerData = {
        ...values,
        role: role,
      };
      console.log("Register Data:", registerData);
    },
  });

  return (
    <>
      <div
        className=""
        style={{ background: ColorAccent.primary, minHeight: "100vh" }}
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="w-25 bg-white rounded-3 mx-auto p-4">
          <h3 className="text-center title">{role === "admin" ? "Admin Register" : "Coach Register"}</h3>
          <p className="text-center">Login to your account to continue.</p>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              name="firstName"
              label="First Name"
              id="firstName"
              val={formik.values.firstName}
              onCh={formik.handleChange("firstName")}
            />
            <div className="error">
              {formik.touched.firstName && formik.errors.firstName ? (
                <div>{formik.errors.firstName}</div>
              ) : null}
            </div>
            <CustomInput
              name="lastName"
              label="Last Name"
              id="lastName"
              val={formik.values.lastName}
              onCh={formik.handleChange("lastName")}
            />
            <div className="error">
              {formik.touched.lastName && formik.errors.lastName ? (
                <div>{formik.errors.lastName}</div>
              ) : null}
            </div>
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
            <CustomInput
              name="confirmPassword"
              label="Confirm Password"
              id="confirmPassword"
              val={formik.values.confirmPassword}
              onCh={formik.handleChange("confirmPassword")}
              secure={true}
            />
            <div className="error">
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div>{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
            <div className="d-flex my-2 align-items-center justify-content-between">
              <div>
                <div className="text-primary text-decoration-underline">Register as coach</div>
              </div>
              <div>
                <Link to="/login">Login</Link>
              </div>
            </div>

            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
              style={{ background: ColorAccent.primary }}
              type="submit"
            >
              Register{" "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
