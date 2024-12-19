import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoach, getAllUser } from "../features/admin/adminSlice";
import { getAllFreeCourse } from "../features/freeCourse/freeCourseSlice";
import {
  getAllPaidCourse,
  getPaidCourseByCoachId,
} from "../features/paidCourse/paidCourseSlice";
import {
  filterOrdersByDate,
  getRevenueByMonth,
  getRevenueByMonthForCoach,
} from "../features/order/orderSlice";
import { loadUserFromSecureStore } from "../features/user/userSlice";
import { Button, DatePicker, Select } from "antd";
import moment from "moment";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state?.user?.user);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [filteredRevenue, setFilteredRevenue] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);

  // Lấy dữ liệu tổng quan từ store
  const quantityUser = useSelector((state) => state?.admin?.users?.length) || 0;
  const coaches = useSelector((state) => state?.admin?.coaches);
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
    if (userState?.role === "admin") {
      dispatch(getAllUser());
      dispatch(getAllCoach());
      dispatch(getAllFreeCourse());
      dispatch(getAllPaidCourse());
      dispatch(getRevenueByMonth());
    } else if (userState?.role === "coach") {
      dispatch(getPaidCourseByCoachId(userState?.id));
      dispatch(getRevenueByMonthForCoach(userState?.id));
    }
    dispatch(loadUserFromSecureStore());
  }, [dispatch, userState?.role, userState?.id]);

  const handleFilter = () => {
    if (startDate && endDate) {
      const formattedStartDate = startDate.format("YYYY-MM-DD");
      const formattedEndDate = endDate.format("YYYY-MM-DD");
      console.log("Start Date:", formattedStartDate);
      console.log("end Date:", formattedEndDate);
      if (
        startDate.isSame(moment(), "day") &&
        endDate.isSame(moment(), "day")
      ) {
        if (userState?.role === "admin") {
          dispatch(getRevenueByMonth());
        } else {
          dispatch(getRevenueByMonthForCoach(userState?.id));
        }
      } else {
        dispatch(
          filterOrdersByDate({
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          })
        );
        setFilteredRevenue(true);
      }
    }
  };

  useEffect(() => {
    if (selectedCoach) {
      dispatch(getRevenueByMonthForCoach(selectedCoach)); 
    }
  }, [dispatch, selectedCoach]);

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

      <br />
      <div className="d-flex gap-3">
        <DatePicker
          value={startDate}
          onChange={(date) => setStartDate(date)}
          placeholder="Start Date"
        />
        <DatePicker
          value={endDate}
          onChange={(date) => setEndDate(date)}
          placeholder="End Date"
        />
        <Button onClick={handleFilter}>Filter</Button>
        <Select
          placeholder="Select Coach"
          value={selectedCoach}
          onChange={(value) => setSelectedCoach(value)}
          style={{ width: 200 }}
        >
          {coaches?.map((coach) => (
            <Select.Option key={coach?.id} value={coach?.id}>
              {coach?.firstName + " " + coach?.lastName}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div>
        <br />
        <h4>Revenue Statistics</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid stroke="#ccc" />
            {filteredRevenue ? (
              <XAxis dataKey="date" />
            ) : (
              <XAxis dataKey="month" />
            )}
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid stroke="#ccc" />
            {filteredRevenue ? (
              <XAxis dataKey="date" />
            ) : (
              <XAxis dataKey="month" />
            )}
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#007bff" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Dashboard;
