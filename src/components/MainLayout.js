import React, { useState, useEffect, useContext } from "react";
import {
  AiOutlineDashboard,
  AiOutlineUserAdd,
  AiOutlinePicLeft,
  AiOutlinePicRight,
} from "react-icons/ai";
import { MdCircleNotifications } from "react-icons/md";
import { Outlet } from "react-router-dom";
import { FaClipboardList, FaBloggerB, FaCcMastercard } from "react-icons/fa";
import { FaAtlas } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import { loadUserFromSecureStore } from "../features/user/userSlice";
import ProfileModal from "./ProfileModal";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const { clearAuthData } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleViewProfile = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        clearAuthData();
        navigate("/login");
        toast.success("You have been logged out successfully.");
      })
      .catch((error) => {
        if (error === "Network Error") {
          toast.error(
            "There was a problem with the server. Please try again later."
          );
        } else {
          toast.error("An unknown error occurred.");
        }
      });
  };

  const userState = useSelector((state) => state?.user?.user);
  console.log("user state:", userState);

  useEffect(() => {
    dispatch(loadUserFromSecureStore());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <div className="logo">
            <h2 className="text-white fs-5 text-center py-3 mb-0">
              <span className="lg-logo">
                Badminton {userState?.role === "admin" ? "Admin" : "Coach"}
              </span>
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
              ...(userState?.role === "admin"
                ? [
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
                      icon: <FaAtlas className="fs-4" />,
                      label: "Courses",
                      children: [
                        {
                          key: "free-course",
                          icon: <ImBlog className="fs-4" />,
                          label: "Add Free Course",
                        },
                        {
                          key: "free-courses",
                          icon: <FaAtlas className="fs-4" />,
                          label: "Free Courses",
                        },
                        {
                          key: "paid-courses",
                          icon: <FaAtlas className="fs-4" />,
                          label: "Paid Courses",
                        },
                      ],
                    },
                  ]
                : [
                    {
                      key: "course-list",
                      icon: <FaAtlas className="fs-4" />,
                      label: "Courses",
                      children: [
                        {
                          key: "paid-course",
                          icon: <ImBlog className="fs-4" />,
                          label: "Add Paid Course",
                        },
                        {
                          key: "paid-courses",
                          icon: <FaAtlas className="fs-4" />,
                          label: "Paid Courses",
                        },
                      ],
                    },
                  ]),
              {
                key: "category-list",
                icon: <FaBloggerB className="fs-4" />,
                label: "Categories",
                children: [
                  {
                    key: "category",
                    icon: <ImBlog className="fs-4" />,
                    label: "Add Category",
                  },
                  {
                    key: "categories",
                    icon: <FaBloggerB className="fs-4" />,
                    label: "Categories",
                  },
                ],
              },
              {
                key: "orders",
                icon: <FaCcMastercard className="fs-4" />,
                label: "Orders",
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
                    width={32}
                    height={32}
                    src={userState?.avatar || "https://via.placeholder.com/100"}
                    alt=""
                  />
                </div>
                <div
                  className="dropdown-toggle profile"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <h6 className="mb-0">
                    {userState?.firstName} {userState?.lastName}
                  </h6>
                  <p className="mb-0">{userState?.email}</p>
                </div>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <button
                      className="dropdown-item py-1 mb-1"
                      style={{ height: "auto", lineHeight: "20px" }}
                      onClick={handleViewProfile}
                    >
                      View Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item py-1 mb-1"
                      style={{ height: "auto", lineHeight: "20px" }}
                      onClick={handleLogout}
                    >
                      Signout
                    </button>
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
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <ProfileModal
        open={isModalVisible}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default MainLayout;
