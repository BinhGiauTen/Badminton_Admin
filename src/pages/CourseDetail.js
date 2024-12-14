import React, { useEffect, useState } from "react";
import { Button, Table, Card, Typography, Space, Divider, Rate } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import CustomModal from "../components/CustomModal";
import {
  deleteFreeLesson,
  getAFreeLesson,
} from "../features/freeLesson/freeLessonSlice";
import {
  getAFreeCourse,
  updateFreeCourseThumbnail,
  deleteFreeCourse,
} from "../features/freeCourse/freeCourseSlice";
import {
  deletePaidCourse,
  getAPaidCourse,
  updatePaidCourseThumbnail,
} from "../features/paidCourse/paidCourseSlice";
import { toast } from "react-toastify";
import {
  deletePaidLesson,
  getAPaidLesson,
} from "../features/paidLesson/paidLessonSlice";
import { getReviewByCourseId } from "../features/review/reviewSlice";
import { Avatar, List } from "antd";
import UserModal from "../components/UserModal";

const { Title, Text } = Typography;

const CourseDetail = () => {
  const [openDeleteCourseModal, setOpenDeleteCourseModal] = useState(false);
  const [openDeleteLessonModal, setOpenDeleteLessonModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [freeLessonId, setFreeLessonId] = useState("");
  const [paidLessonId, setPaidLessonId] = useState("");
  const defaultAvatar = "/images/default.png";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const courseId = pathParts[3];
  const isFreeCourse = pathParts.includes("free-course");
  const isPaidCourse = pathParts.includes("paid-course");
  const userState = useSelector((state) => state?.user?.user);
  const isAdmin = userState?.role === "admin";

  const course = useSelector((state) =>
    isFreeCourse ? state?.freeCourse?.freeCourse : state?.paidCourse?.paidCourse
  );
  const lesson = useSelector((state) =>
    isFreeCourse
      ? state?.freeCourse?.freeCourse?.freeLesson
      : state?.paidCourse?.paidCourse?.paidLesson
  );
  const userCourses = useSelector(
    (state) => state?.paidCourse?.paidCourse?.user_course || []
  );
  const reviews = useSelector((state) => state?.review?.reviews?.data);
  console.log("Review:", reviews);

  const users = userCourses.map((userCourse) => ({
    id: userCourse?.user?.id,
    firstName: userCourse?.user?.firstName,
    lastName: userCourse?.user?.lastName,
    avatar: userCourse?.user?.avatar,
  }));

  useEffect(() => {
    if (isFreeCourse && courseId) {
      dispatch(getAFreeCourse(courseId));
      dispatch(getReviewByCourseId(courseId));
    } else if (isPaidCourse && courseId) {
      dispatch(getAPaidCourse(courseId));
      dispatch(getReviewByCourseId(courseId));
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
          {(!isAdmin || (isAdmin && isFreeCourse)) && (
            <>
              <Link
                className="ms-2 fs-3 text-warning bg-transparent border-0"
                to={`/dashboard/${
                  isFreeCourse ? "free-course" : "paid-course"
                }/${courseId}/lesson/${record.id}`}
              >
                <BiEdit />
              </Link>
              <Button
                className="ms-2 fs-3 text-danger bg-transparent border-0 px-0"
                type="link"
                icon={<AiFillDelete />}
                onClick={() => showDeleteLessonModal(record.id)}
              />
            </>
          )}
        </Space>
      ),
    },
  ];

  const data = lesson?.map((lesson, index) => ({
    key: index + 1,
    lessonName: lesson?.content?.blocks[0]?.data?.text || "No Title",
    courseId: lesson.freeCourseId || lesson.paidCourseId,
    id: lesson.id,
  }));

  const showDeleteCourseModal = () => setOpenDeleteCourseModal(true);
  const showDeleteLessonModal = (id) => {
    if (isFreeCourse) {
      setFreeLessonId(id);
    } else {
      setPaidLessonId(id);
    }
    setOpenDeleteLessonModal(true);
  };

  const hideModal = () => {
    setOpenDeleteCourseModal(false);
    setOpenDeleteLessonModal(false);
  };

  const showUserModal = () => {
    setOpenUserModal(true);
  };

  const hideUserModal = () => {
    setOpenUserModal(false);
  };

  const handleDeleteLesson = () => {
    if (isFreeCourse) {
      dispatch(deleteFreeLesson(freeLessonId)).then(() => {
        dispatch(getAFreeCourse(courseId));
      });
    } else {
      dispatch(deletePaidLesson(paidLessonId)).then(() => {
        dispatch(getAPaidCourse(courseId));
      });
    }
    hideModal();
  };

  const handleDeleteCourse = () => {
    if (isFreeCourse) {
      dispatch(deleteFreeCourse(courseId)).then(() => {
        navigate("/dashboard/free-courses");
        hideModal();
      });
    } else {
      dispatch(deletePaidCourse(courseId)).then(() => {
        navigate("/dashboard/paid-courses");
        hideModal();
      });
    }
  };

  const handleClickAddLesson = () => {
    if (isFreeCourse) {
      navigate(`/dashboard/free-course/${courseId}/add-lesson`);
    } else {
      navigate(`/dashboard/paid-course/${courseId}/add-lesson`);
    }
  };

  const handleClickPreview = (lessonId) => {
    if (isFreeCourse) {
      dispatch(getAFreeLesson(lessonId))
        .unwrap()
        .then(() =>
          navigate(
            `/dashboard/free-course/${courseId}/preview-lesson/${lessonId}`
          )
        );
    } else {
      dispatch(getAPaidLesson(lessonId))
        .unwrap()
        .then(() =>
          navigate(
            `/dashboard/paid-course/${courseId}/preview-lesson/${lessonId}`
          )
        );
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && isFreeCourse) {
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
    } else {
      const payload = {
        paidCourseId: courseId,
        file: selectedFile,
      };
      dispatch(updatePaidCourseThumbnail(payload))
        .unwrap()
        .then(() => {
          toast.success("Uploaded thumbnail successfully.");
          dispatch(getAPaidCourse(courseId));
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
        {isPaidCourse ? (
          <>
            <div className="course-meta">
              <Text strong>Price:</Text> {course?.price}
            </div>
            <div className="course-meta">
              <Text strong>Status:</Text> {course?.status}
            </div>
            <div className="course-meta">
              <Text strong>Star:</Text> {course?.star}
            </div>
            <div className="course-meta">
              <Text strong>Student Quantity:</Text> {course?.studentQuantity}
            </div>
          </>
        ) : null}
        <Divider />

        <div className="course-thumbnail">
          <Title level={5}>Thumbnail</Title>
          <img
            src={course?.thumbnail}
            alt="Course Thumbnail"
            className="thumbnail-image"
          />

          {(!isAdmin || (isAdmin && isFreeCourse)) && (
            <input
              style={{ marginLeft: "10px" }}
              type="file"
              onChange={handleFileChange}
            />
          )}
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
            disabled={isAdmin && isPaidCourse}
          >
            Add New Lesson
          </Button>
          <Button
            type="primary"
            onClick={showDeleteCourseModal}
            block
            style={{
              width: "200px",
              marginLeft: "10px",
            }}
            disabled={
              (lesson?.length > 0 && course?.studentQuantity > 0 && !isAdmin) ||
              (isAdmin && isPaidCourse) ||
              (lesson?.length > 0 && isAdmin)
            }
          >
            Delete Course
          </Button>
          {!isAdmin && (
            <Button
              type="primary"
              onClick={showUserModal}
              block
              style={{
                width: "200px",
                marginLeft: "10px",
              }}
            >
              View Users
            </Button>
          )}
        </div>
        <br />
        {reviews?.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={reviews}
            renderItem={(review) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src={review?.user?.avatar || defaultAvatar} />
                  }
                  title={
                    <>
                      {review?.user?.firstName + " " + review?.user?.lastName}
                      <div>
                        <Rate
                          value={review.rating}
                          disabled
                          style={{ fontSize: 14 }}
                        />
                      </div>
                    </>
                  }
                  description={review.comment}
                />
              </List.Item>
            )}
          />
        ) : (
          <div style={{ textAlign: "left", marginTop: 20 }}>
            <Text type="secondary">No reviews</Text>
          </div>
        )}
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
        performAction={handleDeleteCourse}
        title="Are you sure you want to delete this course?"
      />

      <CustomModal
        open={openDeleteLessonModal}
        hideModal={hideModal}
        performAction={handleDeleteLesson}
        title="Are you sure you want to delete this lesson?"
      />
      <UserModal open={openUserModal} onClose={hideUserModal} users={users} />
    </div>
  );
};

export default CourseDetail;
