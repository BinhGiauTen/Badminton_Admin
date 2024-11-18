import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
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
} from "../features/freeCourse/freeCourseSlice";
import { getAllCategory } from "../features/category/categorySlice";
import { createPaidCourse, getAPaidCourse, updatePaidCourse } from "../features/paidCourse/paidCourseSlice";

const freeSchema = yup.object().shape({
  name: yup.string().required("Course name is required"),
  description: yup.string().required("Description is required"),
  thumbnail: yup.string().required("Thumbnail is required"),
  categoryId: yup.number().required("Category is required"),
  type: yup.string().oneOf(["free", "paid"]).required("Type is required"),
});

const paidSchema = freeSchema.concat(
  yup.object().shape({
    price: yup.string().required("Price is required"),
  })
);

const AddCourse = () => {
  const [type, setType] = useState("free");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const categoryState = useSelector((state) => state.category.categories);

  const pathParts = location.pathname.split("/");
  const courseId = pathParts[3];
  const isFreeCourse = pathParts.includes("free");
  const isPaidCourse = pathParts.includes("paid");

  const freeCourse = useSelector((state) => state?.freeCourse?.freeCourse);
  const paidCourse = useSelector((state) => state?.paidCourse?.paidCourse);
  const userState = useSelector((state) => state?.user?.user);

  useEffect(() => {
    if (isFreeCourse && courseId) {
      dispatch(getAFreeCourse(courseId));
    }else if (isPaidCourse && courseId){
      dispatch(getAPaidCourse(courseId));
    } 
    else {
      dispatch(resetState());
    }
  }, [dispatch, courseId, isFreeCourse, isPaidCourse]);

  const validationSchema = type === "free" ? freeSchema : paidSchema;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: freeCourse?.name || paidCourse?.name || "",
      description: freeCourse?.description || paidCourse?.description || "",
      thumbnail: freeCourse?.thumbnail || paidCourse?.thumbnail || "",
      categoryId: freeCourse?.categoryId || paidCourse?.categoryId || 0,
      type: freeCourse?.type || paidCourse?.type || "free",
      price: paidCourse?.price || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const freeData = {
        ...values,
        categoryId: Number(values.categoryId),
      };
      const paidData = {
        ...values,
        categoryId: Number(values.categoryId),
        coachId: userState.id
      };
      if (isFreeCourse && courseId) {
        dispatch(updateFreeCourse({ id: courseId, freeCourseData: freeData }))
          .unwrap()
          .then(() => {
            toast.success("Free course updated successfully");
            navigate("/dashboard/courses");
          })
          .catch(handleError);
      } else if (isPaidCourse && courseId) {
        dispatch(updatePaidCourse({ id: courseId, paidCourseData: paidData }))
          .unwrap()
          .then(() => {
            toast.success("Paid course updated successfully");
            navigate("/dashboard/courses");
          })
          .catch(handleError);
      } else if (type === "free") {
        dispatch(createFreeCourse(freeData))
          .unwrap()
          .then(() => {
            toast.success("Free course created successfully");
            navigate("/dashboard/courses");
          })
          .catch(handleError);
        formik.resetForm();
      } else {
        dispatch(createPaidCourse(paidData))
          .unwrap()
          .then(() => {
            toast.success("Paid course created successfully");
            navigate("/dashboard/courses");
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
      toast.error("There was a problem with the server. Please try again later.");
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
        {courseId !== undefined ? "Edit" : "Add"}{" "}
        {type === "free" ? "Free" : "Paid"} Course
      </h3>
      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <select
            name="type"
            onChange={(e) => {
              const selectedType = e.target.value;
              setType(selectedType);
              formik.setFieldValue("type", selectedType);
            }}
            onBlur={formik.handleBlur("type")}
            value={formik.values.type}
            className="form-control py-3 mb-3"
            id="type"
          >
            <option value="">Select Type</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>

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
          <br/>

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

          <CustomInput
            type="text"
            label="Thumbnail"
            name="thumbnail"
            id="thumbnail"
            onCh={formik.handleChange("thumbnail")}
            onBl={formik.handleBlur("thumbnail")}
            val={formik.values.thumbnail}
          />
          <div className="error">
            {formik.touched.thumbnail && formik.errors.thumbnail ? (
              <div>{formik.errors.thumbnail}</div>
            ) : null}
          </div>
          <br />

          <select
            name="categoryId"
            onChange={formik.handleChange("categoryId")}
            onBlur={formik.handleBlur("categoryId")}
            value={formik.values.categoryId}
            className="form-control py-3 mb-3"
            id="categoryId"
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

          {type === "paid" ? (
            <div>
              <CustomInput
                type="text"
                label="Price"
                name="price"
                id="price"
                onCh={formik.handleChange("price")}
                onBl={formik.handleBlur("price")}
                val={formik.values.price}
              />
              <div className="error">
                {formik.touched.price && formik.errors.price ? (
                  <div>{formik.errors.price}</div>
                ) : null}
              </div>
            </div>
          ) : (
            ""
          )}

          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            {courseId !== undefined ? "Edit" : "Add"}{" "}
            {type === "free" ? "Free" : "Paid"} Course
          </button>
        </form>
      </div>
    </>
  );
};
export default AddCourse;
