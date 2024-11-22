import React, { useEffect, useState } from "react";
import { Button, Table, Card, Typography, Space, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import CustomModal from "../components/CustomModal";
import { deleteFreeLesson, getAFreeLesson } from "../features/lesson/lessonSlice";
import { getAFreeCourse, updateFreeCourseThumbnail, deleteFreeCourse } from "../features/freeCourse/freeCourseSlice";
import { getAPaidCourse } from "../features/paidCourse/paidCourseSlice";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const CourseDetail = () => {
  const [openDeleteCourseModal, setOpenDeleteCourseModal] = useState(false);
  const [openDeleteLessonModal, setOpenDeleteLessonModal] = useState(false);
  const [freeLessonId, setFreeLessonId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const courseId = pathParts[3];
  const isFreeCourse = pathParts.includes("free-course");
  const isPaidCourse = pathParts.includes("paid-course");

  const course = useSelector((state) =>
    isFreeCourse ? state?.freeCourse?.freeCourse : state?.paidCourse?.paidCourse
  );
  const freeLesson = useSelector((state) => state?.freeCourse?.freeCourse?.freeLesson);

  useEffect(() => {
    if (isFreeCourse && courseId) {
      dispatch(getAFreeCourse(courseId));
    } else if (isPaidCourse && courseId) {
      dispatch(getAPaidCourse(courseId));
    }
  }, [dispatch, courseId, isFreeCourse, isPaidCourse]);

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Lesson Name",
      dataIndex: "lessonName",
    },
    {
      title: "Course Id",
      dataIndex: "courseId",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="ms-2 fs-3 text-info bg-transparent border-0"
            type="link"
            icon={<FaEye />}
            onClick={() => handleClickPreview(record.id)}
          />
          <Link
            className="ms-2 fs-3 text-warning bg-transparent border-0"
            to={`/dashboard/free-course/${courseId}/lesson/${record.id}`}
          >
            <BiEdit />
          </Link>
          <Button
            className="ms-2 fs-3 text-danger bg-transparent border-0 px-0"
            type="link"
            icon={<AiFillDelete />}
            onClick={() => showDeleteLessonModal(record.id)}
          />
        </Space>
      ),
    },
  ];

  const data = freeLesson?.map((lesson, index) => ({
    key: index + 1,
    lessonName: lesson?.content?.blocks[0]?.data?.text || "No Title",
    courseId: lesson.freeCourseId,
    id: lesson.id,
  }));

  const showDeleteCourseModal = () => setOpenDeleteCourseModal(true);
  const showDeleteLessonModal = (id) => {
    setFreeLessonId(id);
    setOpenDeleteLessonModal(true);
  };

  const hideModal = () => {
    setOpenDeleteCourseModal(false);
    setOpenDeleteLessonModal(false);
  };

  const handleDeleteFreeLesson = () => {
    dispatch(deleteFreeLesson(freeLessonId)).then(() => {
      dispatch(getAFreeCourse(courseId));
      hideModal();
    });
  };

  const handleDeleteFreeCourse = () => {
    dispatch(deleteFreeCourse(courseId)).then(() => {
      navigate("/dashboard/courses");
      hideModal();
    });
  };

  const handleClickAddLesson = () => {
    navigate(`/dashboard/free-course/${courseId}/add-lesson`);
  };

  const handleClickPreview = (lessonId) => {
    dispatch(getAFreeLesson(lessonId))
      .unwrap()
      .then(() =>
        navigate(`/dashboard/free-course/${courseId}/preview-lesson`)
      );
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const payload = {
        freeCourseId: courseId,
        file: selectedFile,
      };
      dispatch(updateFreeCourseThumbnail(payload))
        .unwrap()
        .then(() => {
          toast.success("Uploaded thumbnail successfully.");
          dispatch(getAFreeCourse(courseId));
        })
        .catch((error) => {
          if (error === "Request failed with status code 404") {
            toast.error("Upload thumbnail failed. Please try again.");
          } else if (error === "Network Error") {
            toast.error("There was a server problem. Please try later.");
          } else {
            toast.error("An unknown error occurred.");
          }
        });
    }
  };

  return (
    <div className="course-detail-container">
      <Card className="course-info-card" bordered>
        <Title level={3}>{course?.name}</Title>
        <Text>{course?.description}</Text>
        <Divider />
        <div className="course-meta">
          <Text strong>Type:</Text> {course?.type}
        </div>
        <div className="course-meta">
          <Text strong>Lesson Quantity:</Text> {course?.lessonQuantity}
        </div>
        <Divider />
        <div className="course-thumbnail">
          <Title level={5}>Thumbnail</Title>
          <img
            src={course?.thumbnail}
            alt="Course Thumbnail"
            className="thumbnail-image"
          />
          <input
            style={{ marginLeft: "10px" }}
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <div className="d-flex mt-4">
          <Button
            type="primary"
            onClick={handleClickAddLesson}
            block
            style={{
              width: "200px",
              backgroundColor: "green",
              borderColor: "green",
            }}
          >
            Add New Lesson
          </Button>
          <Button
            type="primary"
            onClick={showDeleteCourseModal}
            block
            style={{ width: "200px", marginLeft: "10px" }}
          >
            Delete Course
          </Button>
        </div>
      </Card>

      <Table
        columns={columns}
        dataSource={data}
        className="lesson-table"
        pagination={{ pageSize: 5 }}
        rowKey={(record) => record.key}
      />

      <CustomModal
        open={openDeleteCourseModal}
        hideModal={hideModal}
        performAction={handleDeleteFreeCourse}
        title="Are you sure you want to delete this free course?"
      />

      <CustomModal
        open={openDeleteLessonModal}
        hideModal={hideModal}
        performAction={handleDeleteFreeLesson}
        title="Are you sure you want to delete this lesson?"
      />
    </div>
  );
};

export default CourseDetail;
