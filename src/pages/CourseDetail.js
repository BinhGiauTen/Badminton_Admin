import React, { useEffect, useState } from "react";
import { Button, Table, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import {
  deleteFreeLesson,
  getAFreeLesson,
} from "../features/lesson/lessonSlice";
import CustomModal from "../components/CustomModal";
import { AiFillDelete, AiOutlineUpload } from "react-icons/ai";
import { getAFreeCourse } from "../features/freeCourse/freeCourseSlice";
import { getAPaidCourse } from "../features/paidCourse/paidCourseSlice";

const CourseDetail = () => {
  const [open, setOpen] = useState(false);
  const [freeLessonId, setFreeLessonId] = useState("");
  const showModal = (e) => {
    setFreeLessonId(e);
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
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
  console.log("Free Lesson:", freeLesson);
  const paidLesson = useSelector(
    (state) => state?.paidCourse?.paidCourse?.paidLesson
  );
  console.log("Paid Lesson:", paidLesson);
  // const userState = useSelector((state) => state?.user?.user);

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
    },
  ];

  const data = freeLesson?.map((lesson, index) => ({
    key: index + 1,
    lessonName: lesson?.content?.blocks[0]?.data?.text || "No Title",
    courseId: lesson.freeCourseId,
    action: (
      <>
        <Link
          className="ms-2 fs-3 text-danger bg-transparent border-0"
          to={`/free-lesson/${lesson.id}`}
        >
          <BiEdit />
        </Link>
        <button
          className="ms-2 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(lesson.id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  const handleDeleteFreeeLesson = (e) => {
    dispatch(deleteFreeLesson(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAFreeLesson(2));
    }, 100);
  };

  const handleUpload = (info) => {
    // Implement image upload functionality here
    console.log("Upload image:", info.file);
  };

  return (
    <>
      {/* <div className="course-info-grid">
        <div>
          <h4>Course Name</h4>
          <p>{course?.name}</p>
        </div>
        <div>
          <h4>Description</h4>
          <p>{course?.description}</p>
        </div>
        <div>
          <h4>Type</h4>
          <p>{course?.type}</p>
        </div>
        <div>
          <h4>Price</h4>
          <p>${course?.price}</p>
        </div>
        <div>
          <h4>Status</h4>
          <p>{course?.status}</p>
        </div>
        <div>
          <h4>Star Rating</h4>
          <p>{course?.star} stars</p>
        </div>
        <div>
          <h4>Lesson Quantity</h4>
          <p>{course?.lessonQuantity}</p>
        </div>
        <div>
          <h4>Student Quantity</h4>
          <p>{course?.studentQuantity}</p>
        </div>
        <div>
          <h4>Thumbnail</h4>
          <img
            src={course?.thumbnail}
            alt="Course Thumbnail"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <Upload onChange={handleUpload} showUploadList={false}>
            <Button icon={<AiOutlineUpload />} className="mt-2">
              Upload New Thumbnail
            </Button>
          </Upload>
        </div>
      </div> */}

      <div className="course-detail-container">
        {/* Course Information Section */}
        <div className="course-info">
          <h2 className="course-title">{course?.name}</h2>
          <p className="course-description">{course?.description}</p>
          <div className="course-details">
            <div>
              <strong>Type:</strong> {course?.type}
            </div>
            <div>
              <strong>Lesson Quantity:</strong> {course?.lessonQuantity}
            </div>
          </div>
        </div>
      </div>

      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          handleDeleteFreeeLesson(freeLessonId);
        }}
        title="Are you sure you want to delete this free lesson"
      />
    </>
  );
};

export default CourseDetail;
