import React, {useEffect} from "react";
import CustomInput from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { forgotPassword, resetState } from "../../features/auth/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

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
      dispatch(forgotPassword(data));
    },
  });

  const {message} = useSelector((state) => state?.auth);
  useEffect(() => {
    if (message === "OTP sent to email successfully") {
      toast.success("OTP sent to email successfully !!!");
      navigate("/reset-password", { state: { email: formik.values.email } });
      dispatch(resetState());
    } else if(message === "Failed to send OTP") {
      toast.error("Email not found !!!");
      dispatch(resetState());
    }
  }, [message,navigate, dispatch, formik.values.email]);


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
          <h3 className="text-center title">Forgot password</h3>
          <p className="text-center">
            Please enter your register email to get reset password mail.
          </p>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
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
            <br />
            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100"
              style={{ background: "#ffd333" }}
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
