import axiosInstance from "../../utils/axiosInstance";


const getAllCategory = async () => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `categories`
  );
  return response.data;
};

const addCategory = async (categoryName) => {
  const response = await axiosInstance.post(
    process.env.REACT_APP_BASE_URL + `categories`,
    categoryName
  );
  return response.data;
};

const updateCategory = async (category) => {
  const response = await axiosInstance.patch(
    process.env.REACT_APP_BASE_URL + `categories/${category.id}`,
    {
      name: category.categoryData.name,
    }
  );
  return response.data;
};

const getACategory = async (categoryId) => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `categories/${categoryId}`
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
