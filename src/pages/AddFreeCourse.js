import React, { useState, useEffect } from "react";
import CustomInput from "../components/CustomInput";
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

let schema = yup.object().shape({
  name: yup.string().required("Free course name is required"),
  description: yup.string().required("Description is required"),
  thumbnail: yup.string().required("Thumbnail is required"),
  lessionQuantity: yup.number().required("Lession quantity is required"),
});

const AddFreeCourse = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getFreeCourseId = location.pathname.split("/")[2];
  const categoryState = useSelector((state) => state.category.categories);
  const freeCourse = useSelector((state) => state.freeCourse.freeCourse);
  console.log("FreeCourse:", freeCourse);

  useEffect(() => {
    if (getFreeCourseId !== undefined) {
      dispatch(getAFreeCourse(getFreeCourseId));
    } else {
      dispatch(resetState());
    }
  }, [getFreeCourseId]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: freeCourse?.name || "",
      description: freeCourse?.description || "",
      thumbnail: freeCourse?.thumbnail || "",
      lessionQuantity: freeCourse?.lessionQuantity || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getFreeCourseId !== undefined) {
        const data = { id: getFreeCourseId, freeCourseData: values };
        dispatch(updateFreeCourse(data))
          .unwrap()
          .then(() => {
            toast.success("Free course updated successfully");
            navigate("/free-courses");
          })
          .catch((error) => {
            if (error === "Request failed with status code 404") {
              toast.error(`Free course with id ${getFreeCourseId} not found`);
            } else if (error === "Network Error") {
              toast.error(
                "There was a problem with the server. Please try again later."
              );
            } else {
              toast.error("An unknown error occurred.");
            }
          });
      } else {
        // console.log("Values data:", values);
        dispatch(createFreeCourse(values))
          .unwrap()
          .then(() => {
            toast.success("Free course created successfully");
            navigate("/free-courses");
          })
          .catch((error) => {
            if (error === "Network Error") {
              toast.error(
                "There was a problem with the server. Please try again later."
              );
            } else {
              toast.error("An unknown error occurred.");
            }
          });
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  return (
    <>
      <h3 className="mb-4 title">
        {getFreeCourseId !== undefined ? "Edit" : "Add"} Free Course
      </h3>
      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Free Course Name"
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

          <CustomInput
            type="text"
            label="Free Course Description"
            name="description"
            id="description"
            onCh={formik.handleChange("description")}
            onBl={formik.handleBlur("description")}
            val={formik.values.description}
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

          <CustomInput
            type="number"
            label="Lession Quantity"
            name="lessionQuantity"
            id="lessionQuantity"
            onCh={formik.handleChange("lessionQuantity")}
            onBl={formik.handleBlur("lessionQuantity")}
            val={formik.values.lessionQuantity}
          />
          <div className="error">
            {formik.touched.lessionQuantity && formik.errors.lessionQuantity ? (
              <div>{formik.errors.lessionQuantity}</div>
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

          <select
            name="type"
            onChange={formik.handleChange("type")}
            onBlur={formik.handleBlur("type")}
            value={formik.values.type}
            className="form-control py-3 mb-3"
            id="type"
          >
            <option value="">Select Type</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>

          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            {getFreeCourseId !== undefined ? "Edit" : "Add"} Free Course
          </button>
        </form>
      </div>
    </>
  );
};
export default AddFreeCourse;
