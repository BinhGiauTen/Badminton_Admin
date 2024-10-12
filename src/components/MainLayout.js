import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineUserAdd,
  AiOutlinePicLeft,
  AiOutlinePicRight,
} from "react-icons/ai";
import { MdCircleNotifications } from "react-icons/md";
import { Outlet } from "react-router-dom";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
// import ModalProfile from "./ModalProfile";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const userState = useSelector((state) => state?.auth?.user);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="lg-logo">Badminton Admin</span>
            <span className="sm-logo">BA</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "coaches",
              icon: <AiOutlineUserAdd className="fs-4" />,
              label: "Coaches",
            },
            {
              key: "users",
              icon: <FaClipboardList className="fs-4" />,
              label: "Users",
            },
            {
              key: "course-list",
              icon: <FaBloggerB className="fs-4" />,
              label: "Courses",
              children: [
                {
                  key: "course",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Course",
                },
                {
                  key: "courses",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Courses",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-3 pe-4"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <AiOutlinePicLeft /> : <AiOutlinePicRight />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-4 align-items-center dropdown">
            <div className="position-relative">
              <MdCircleNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center">
              <div>
                <img
                  width={36}
                  height={36}
                  src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                  alt=""
                  className="avatar-img"
                />
              </div>
              <div
                className="dropdown-toggle profile"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h6 className="mb-0">{userState?.user_name}</h6>
                <p className="mb-0">{userState?.email}</p>
              </div>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <div
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                  >
                    View Profile
                  </div>
                </li>
                {/* <ModalProfile /> */}
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/login"
                  >
                    Signout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
