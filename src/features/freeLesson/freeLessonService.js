import axiosInstance from "../../utils/axiosInstance";


const createFreeLesson = async (freeLesson) => {
  const response = await axiosInstance.post(
    process.env.REACT_APP_BASE_URL + `lessons/free`,
    freeLesson
  );
  return response.data;
};

const updateFreeLesson = async (freeLesson) => {
  const response = await axiosInstance.patch(
    process.env.REACT_APP_BASE_URL + `lessons/free/${freeLesson.id}`,
    {
        content: freeLesson.freeLessonData.content,
        name: freeLesson.freeLessonData.name,
    }
  );
  return response.data;
};

const getAFreeLesson = async (freeLessonId) => {
  const response = await axiosInstance.get(
    process.env.REACT_APP_BASE_URL + `lessons/free/${freeLessonId}`
  );
  return response.data;
};

const deleteFreeLesson = async (freeLessonId) => {
    const response = await axiosInstance.delete(
      process.env.REACT_APP_BASE_URL + `lessons/free/${freeLessonId}`
    );
    return response.data;
  };

const uploadImageLesson = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axiosInstance.patch(
    process.env.REACT_APP_BASE_URL + `lessons/free/image`,
    formData
  );
  return response.data;
};

const uploadVideoLesson = async (file) => {
  const formData = new FormData();
  formData.append("video", file);
  const response = await axiosInstance.patch(
    process.env.REACT_APP_BASE_URL + `lessons/free/video`,
    formData
  );
  return response.data;
};

const freeLessonService = {
  createFreeLesson,
  updateFreeLesson,
  getAFreeLesson,
  deleteFreeLesson,
  uploadImageLesson,
  uploadVideoLesson
};
export default freeLessonService;
