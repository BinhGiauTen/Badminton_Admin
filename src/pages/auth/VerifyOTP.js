import React, {useContext} from "react";
import CustomInput from "../../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { verifyOTP } from "../../features/auth/authSlice";
import AuthContext from "../../context/AuthContext";
import { ColorAccent } from "../../constant/Color";


const VerifyOTP = () => {
  const { storeAuthData } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const email = location.state?.email;
  const role = location.state?.role;

  const schema = Yup.object().shape({
    otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required("Otp is required"),
  });

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = {
        ...values,
        email: email,
        role: role,
      };
      dispatch(verifyOTP(data)).unwrap()
      .then((userState) => {
        console.log("User state in otp:", userState);
        storeAuthData(userState?.data?.user, userState?.data?.token);
        toast.success("You have been login successfully.")
        navigate("/dashboard");
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
            Please enter the One Time Passcode (OTP) sent to your email address.
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
            <br />
            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100"
              style={{ background: ColorAccent.primary }}
              type="submit"
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
