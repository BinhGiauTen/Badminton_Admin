import axiosInstance from "../../utils/axiosInstance";


const getReviewByCourseId = async (courseId) => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `reviews/course/${courseId}`
  );
  return response.data;
};


const reviewService = {
  getReviewByCourseId
};
export default reviewService;
