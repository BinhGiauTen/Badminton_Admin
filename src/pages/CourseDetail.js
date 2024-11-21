import React, { useEffect, useState } from "react";
import { Button, Table, Upload, Card, Typography, Space, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete, AiOutlineUpload } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import CustomModal from "../components/CustomModal";
import {
  deleteFreeLesson,
  getAFreeLesson,
} from "../features/lesson/lessonSlice";
import { getAFreeCourse } from "../features/freeCourse/freeCourseSlice";
import { getAPaidCourse } from "../features/paidCourse/paidCourseSlice";

const { Title, Text } = Typography;

const CourseDetail = () => {
  const [open, setOpen] = useState(false);
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
  const freeLesson = useSelector(
    (state) => state?.freeCourse?.freeCourse?.freeLesson
  );

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
            onClick={() => showModal(record.id)}
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

  const showModal = (id) => {
    setFreeLessonId(id);
    setOpen(true);
  };

  const hideModal = () => setOpen(false);

  const handleDeleteFreeeLesson = (id) => {
    dispatch(deleteFreeLesson(id)).then(() => {
      dispatch(getAFreeCourse(courseId));
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

  const handleUpload = (info) => {
    console.log("Upload image:", info.file);
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
        <Button type="primary" onClick={handleClickAddLesson} block>
          Add New Lesson
        </Button>
        <Divider />
        <div className="course-thumbnail">
          <Title level={5}>Thumbnail</Title>
          <img
            src={course?.thumbnail}
            alt="Course Thumbnail"
            className="thumbnail-image"
          />
          <Upload onChange={handleUpload} showUploadList={false}>
            <Button icon={<AiOutlineUpload />}>Upload New Thumbnail</Button>
          </Upload>
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
        hideModal={hideModal}
        open={open}
        performAction={() => handleDeleteFreeeLesson(freeLessonId)}
        title="Are you sure you want to delete this lesson?"
      />
    </div>
  );
};

export default CourseDetail;
