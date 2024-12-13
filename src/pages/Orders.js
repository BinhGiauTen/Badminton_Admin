import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getAllOrdersForCoach } from "../features/order/orderSlice";
import { format } from "date-fns";

const Orders = () => {
  const userState = useSelector((state) => state?.user?.user);
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
    },
    {
      title: "Total",
      dataIndex: "total",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "User Id",
      dataIndex: "userId",
    },
    {
      title: "Paid Course Id",
      dataIndex: "paidCourseId",
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    if(userState?.role ==="admin"){
      dispatch(getAllOrders());
    }else{
      dispatch(getAllOrdersForCoach(userState?.id));
    }
    
  }, [dispatch]);

  const orderState = useSelector((state) => state.order.orders);
  const data = [];

  const currencyFormatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  for (let i = 0; i < orderState.length; i++) {
    data.push({
      key: i + 1,
      created_at: format(new Date(orderState[i]?.created_at), "dd/MM/yyyy"),
      total: currencyFormatter.format(orderState[i]?.total * 1000),
      status: orderState[i]?.status,
      userId: orderState[i]?.userId,
      paidCourseId: orderState[i]?.paidCourseId,
    });
  }

  return (
    <>
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table
          columns={columns}
          dataSource={data}
          rowClassName={(record) => {
            if (record.status === "pending") return "row-pending";
            if (record.status === "success") return "row-success";
            return "";
          }}
        />
      </div>
    </>
  );
};

export default Orders;
