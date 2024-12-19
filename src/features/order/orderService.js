import axiosInstance from "../../utils/axiosInstance";


const getAllOrders = async () => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `order`
  );
  return response.data;
};
const getAllOrdersForCoach = async (id) => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `order/coach/${id}`
  );
  return response.data;
};

const getRevenueByMonth = async () => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `order/revenue`
  );
  return response.data;
};
const getRevenueByMonthForCoach = async (id) => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `order/revenue/coach/${id}`
  );
  return response.data;
};

const filterOrdersByDate = async (date) => {
  const response = await axiosInstance.post(
    process.env.REACT_APP_BASE_URL + `order/filter`,
    date
  );
  return response.data;
};

const orderService = {
  getAllOrders,
  getAllOrdersForCoach,
  getRevenueByMonth,
  getRevenueByMonthForCoach,
  filterOrdersByDate
};
export default orderService;
