import axios from "axios";
import { config } from "../../utils/axiosconfig";

const getAllCategory = async () => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + `categories`,
    config
  );
  return response.data;
};

const addCategory = async (categoryName) => {
  const response = await axios.post(
    process.env.REACT_APP_BASE_URL + `categories`,
    categoryName,
    config
  );
  return response.data;
};

const updateCategory = async (category) => {
  const response = await axios.patch(
    process.env.REACT_APP_BASE_URL + `categories/${category.id}`,
    {
      name: category.categoryData.name,
    },
    config
  );
  return response.data;
};

const getACategory = async (categoryId) => {
  const response = await axios.get(
    process.env.REACT_APP_BASE_URL + `categories/${categoryId}`,
    config
  );
  return response.data;
};

const categoryService = {
  getAllCategory,
  addCategory,
  updateCategory,
  getACategory,
};
export default categoryService;
