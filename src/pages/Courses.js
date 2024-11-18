import React from "react";
import { Tabs } from "antd";
import FreeCourseTable from "../components/FreeCourseTable";
import PaidCourseTable from "../components/PaidCourseTable";


const Courses = () => {
  const items = [
    {
      key: "1",
      label: "Free Course",
      children: <FreeCourseTable />,
    },
    {
      key: "2",
      label: "Paid Course",
      children: <PaidCourseTable/>,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default Courses;
