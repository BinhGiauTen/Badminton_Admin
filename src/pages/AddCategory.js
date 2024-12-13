import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getACategory,
  addCategory,
  resetState,
  updateCategory,
} from "../features/category/categorySlice";

let schema = yup.object().shape({
  name: yup.string().required("Category name is required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCategoryId = location.pathname.split("/")[3];
  const category = useSelector((state) => state.category.category);

  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getACategory(getCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getCategoryId, dispatch]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: category?.name || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCategoryId !== undefined) {
        const data = { id: getCategoryId, categoryData: values };
        dispatch(updateCategory(data))
          .unwrap()
          .then(() => {
            toast.success("Category has been updated");
            navigate("/categories");
          })
          .catch((error) => {
            if (error === "Request failed with status code 400") {
              toast.error("Category with this name have already exist");
            } else if (error === "Request failed with status code 404") {
              toast.error(`Category with id ${getCategoryId} not found`);
            } else if (error === "Network Error") {
              toast.error(
                "There was a problem with the server. Please try again later."
              );
            } else {
              toast.error("An unknown error occurred.");
            }
          });
      } else {
        dispatch(addCategory(values))
          .unwrap()
          .then(() => {
            toast.success("Category has been added");
            navigate("/categories");
          })
          .catch((error) => {
            if (error === "Request failed with status code 400") {
              toast.error("Category with this name have already exist");
            } else if (error === "Network Error") {
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

  return (
    <>
      <h3 className="mb-4 title">
        {getCategoryId !== undefined ? "Edit" : "Add"} category
      </h3>
      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Category Name"
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
          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            {getCategoryId !== undefined ? "Edit" : "Add"} Category
          </button>
        </form>
      </div>
    </>
  );
};
export default AddCategory;
