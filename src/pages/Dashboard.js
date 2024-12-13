import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoach, getAllUser } from "../features/admin/adminSlice";
import { getAllFreeCourse } from "../features/freeCourse/freeCourseSlice";
import {
  getAllPaidCourse,
  getPaidCourseByCoachId,
} from "../features/paidCourse/paidCourseSlice";
import {
  getRevenueByMonth,
  getRevenueByMonthForCoach,
} from "../features/order/orderSlice";
import { loadUserFromSecureStore } from "../features/user/userSlice";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state?.user?.user);

  // Lấy dữ liệu tổng quan từ store
  const quantityUser = useSelector((state) => state?.admin?.users?.length) || 0;
  const quantityCoach =
    useSelector((state) => state?.admin?.coaches?.length) || 0;
  const quantityFreeCourse =
    useSelector((state) => state?.freeCourse?.freeCourses?.data?.length) || 0;
  const quantityPaidCourse = useSelector(
    (state) =>
      state?.paidCourse?.paidCourses?.data?.length ||
      state?.paidCourse?.paidCourses?.length ||
      0
  );

  const revenueData = useSelector((state) => state?.order?.revenue?.data) || [];

  useEffect(() => {
    // Nếu là admin
    if (userState?.role === "admin") {
      dispatch(getAllUser());
      dispatch(getAllCoach());
      dispatch(getAllFreeCourse());
      dispatch(getAllPaidCourse());
      dispatch(getRevenueByMonth());
    }
    // Nếu là coach
    else if (userState?.role === "coach") {
      dispatch(getPaidCourseByCoachId(userState?.id));
      dispatch(getRevenueByMonthForCoach(userState?.id));
    }
    // Tải thông tin người dùng từ Secure Store
    dispatch(loadUserFromSecureStore());
  }, [dispatch, userState?.role, userState?.id]);

  return (
    <>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="dashboard-stats">
        {userState?.role === "admin" && (
          <>
            <div className="card">
              <h4>Total Coaches</h4>
              <p>{quantityCoach}</p>
            </div>

            <div className="card">
              <h4>Total Users</h4>
              <p>{quantityUser}</p>
            </div>

            <div className="card">
              <h4>Total Free Courses</h4>
              <p>{quantityFreeCourse}</p>
            </div>
          </>
        )}
        <div className="card">
          <h4>Total Paid Courses</h4>
          <p>{quantityPaidCourse}</p>
        </div>
      </div>

      <div>
        <br />
        <h4>Revenue Statistics</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Dashboard;
