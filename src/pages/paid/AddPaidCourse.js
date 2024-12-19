import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllCategory } from "../../features/category/categorySlice";
import {
  createPaidCourse,
  getAPaidCourse,
  resetState,
  updatePaidCourse,
} from "../../features/paidCourse/paidCourseSlice";

const paidSchema = yup.object().shape({
  name: yup.string().required("Course name is required"),
  description: yup.string().required("Description is required"),
  categoryId: yup
    .number()
    .typeError("Category is required")
    .required("Category is required")
    .min(1, "Category is required"),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0"),
});

const AddPaidCourse = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const categoryState = useSelector((state) => state.category.categories);

  const pathParts = location.pathname.split("/");
  const courseId = pathParts[3];
  const isPaidCourse = pathParts.includes("paid-course");

  const paidCourse = useSelector((state) => state?.paidCourse?.paidCourse);
  const userState = useSelector((state) => state?.user?.user);

  useEffect(() => {
    if (isPaidCourse && courseId) {
      dispatch(getAPaidCourse(courseId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, courseId, isPaidCourse]);

  const validationSchema = paidSchema;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: paidCourse?.name || "",
      description: paidCourse?.description || "",
      categoryId: paidCourse?.categoryId || 0,
      price: paidCourse?.price || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const paidData = {
        ...values,
        type: "paid",
        categoryId: Number(values.categoryId),
        coachId: userState.id,
        thumbnail:
          "https://blog.playo.co/wp-content/uploads/2017/12/badminton-coaching-in-bangalore.jpg",
        status: "non-publish",
      };
      if (isPaidCourse && courseId) {
        dispatch(updatePaidCourse({ id: courseId, paidCourseData: paidData }))
          .unwrap()
          .then(() => {
            toast.success("Paid course updated successfully");
            navigate("/dashboard/paid-courses");
          })
          .catch(handleError);
      } else {
        console.log("Paid data create:", paidData);
        dispatch(createPaidCourse(paidData))
          .unwrap()
          .then(() => {
            toast.success("Paid course created successfully");
            navigate("/dashboard/paid-courses");
          })
          .catch(handleError);
        formik.resetForm();
      }
    },
  });

  const handleError = (error) => {
    if (error === "Request failed with status code 404") {
      toast.error(`Course with id ${courseId} not found`);
    } else if (error === "Network Error") {
      toast.error(
        "There was a problem with the server. Please try again later."
      );
    } else {
      toast.error("An unknown error occurred.");
    }
  };

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <>
      <h3 className="mb-4 title">
        {courseId !== undefined ? "Edit" : "Add"} Paid Course
      </h3>
      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Course Name"
            name="name"
            id="name"
            onCh={formik.handleChange("name")}
            onBl={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </div>
          <br />

          <Input.TextArea
            placeholder="Course Description"
            name="description"
            id="description"
            rows={4}
            onChange={formik.handleChange("description")}
            onBlur={formik.handleBlur("description")}
            value={formik.values.description}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description ? (
              <div>{formik.errors.description}</div>
            ) : null}
          </div>
          <br />

          <select
            name="categoryId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.categoryId}
            className={`form-control py-3 mb-3 ${
              formik.touched.categoryId && formik.errors.categoryId
                ? "is-invalid"
                : ""
            }`}
            id="categoryId"
            disabled={courseId !== undefined}
          >
            <option value="">Select Category</option>
            {categoryState.map((i, j) => {
              return (
                <option key={j} value={i.id}>
                  {i.name}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.categoryId && formik.errors.categoryId ? (
              <div>{formik.errors.categoryId}</div>
            ) : null}
          </div>

          <div>
            <CustomInput
              type="number"
              label="Price"
              name="price"
              id="price"
              onCh={(e) => {
                const value = e.target.value;
                if (!isNaN(value) && Number(value) >= 0) {
                  formik.handleChange("price")(e);
                }
              }}
              onBl={formik.handleBlur("price")}
              val={formik.values.price}
            />
            <div className="error">
              {formik.touched.price && formik.errors.price ? (
                <div>{formik.errors.price}</div>
              ) : null}
            </div>
          </div>
          <br />

          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            {courseId !== undefined ? "Edit" : "Add"} Paid Course
          </button>
        </form>
      </div>
    </>
  );
};
export default AddPaidCourse;
