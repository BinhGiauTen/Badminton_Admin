import React, { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAFreeCourse,
  createFreeCourse,
  resetState,
  updateFreeCourse,
} from "../../features/freeCourse/freeCourseSlice";
import { getAllCategory } from "../../features/category/categorySlice";

const freeSchema = yup.object().shape({
  name: yup.string().required("Course name is required"),
  description: yup.string().required("Description is required"),
  categoryId: yup
    .number()
    .typeError("Category is required")
    .required("Category is required")
    .min(1, "Category is required"),
});

const AddFreeCourse = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const categoryState = useSelector((state) => state.category.categories);

  const pathParts = location.pathname.split("/");
  const courseId = pathParts[3];
  const isFreeCourse = pathParts.includes("free-course");

  const freeCourse = useSelector((state) => state?.freeCourse?.freeCourse);

  useEffect(() => {
    if (isFreeCourse && courseId) {
      dispatch(getAFreeCourse(courseId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, courseId, isFreeCourse]);

  const validationSchema = freeSchema;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: freeCourse?.name || "",
      description: freeCourse?.description || "",
      categoryId: freeCourse?.categoryId || 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const freeData = {
        ...values,
        type: "free",
        categoryId: Number(values.categoryId),
        thumbnail:
          "https://blog.playo.co/wp-content/uploads/2017/12/badminton-coaching-in-bangalore.jpg",
      };
      if (isFreeCourse && courseId) {
        dispatch(updateFreeCourse({ id: courseId, freeCourseData: freeData }))
          .unwrap()
          .then(() => {
            toast.success("Free course updated successfully");
            navigate("/dashboard/free-courses");
          })
          .catch(handleError);
      } else {
        dispatch(createFreeCourse(freeData))
          .unwrap()
          .then(() => {
            toast.success("Free course created successfully");
            navigate("/dashboard/free-courses");
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
        {courseId !== undefined ? "Edit" : "Add"} Free Course
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

          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            {courseId !== undefined ? "Edit" : "Add"} Free Course
          </button>
        </form>
      </div>
    </>
  );
};
export default AddFreeCourse;
