import PropTypes from "prop-types";
import UserProvider from "../context/userContext";
import "./layout.css";
import {
  TeamOutlined,
  FileOutlined,
  PieChartOutlined,
  PlusOutlined,
  MenuOutlined,
  CloseOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
const { Header, Content, Sider } = Layout;
import { useState } from "react";
import accountServices from "../services/account/accountServices";
import toast from "react-hot-toast";
import PaperIcon from "../assets/logo/paperIcon";

const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const items = [
    {
      label: (
        <Link
          onClick={() => setSideBar(false)}
          className="uppercase text-xs"
          to="../accounts/dashboard"
        >
          {" "}
          Dashboard{" "}
        </Link>
      ),
      key: "dashb",
      icon: <PieChartOutlined />,
    },
    {
      label: (
        <Link
          onClick={() => setSideBar(false)}
          className="uppercase text-xs"
          to="../accounts/invoices"
        >
          {" "}
          Invoices{" "}
        </Link>
      ),
      key: "invoices",
      icon: <FileOutlined />,
    },
    // {
    //   label: (
    //     <Link onClick={() => setSideBar(false)} to="../accounts/invoices/new">
    //       New Invoice
    //     </Link>
    //   ),
    //   key: "profiles",
    //   icon: <PlusOutlined />,
    // },
    {
      label: (
        <Link
          onClick={() => setSideBar(false)}
          className="uppercase text-xs"
          to="../accounts/profiles"
        >
          Profiles
        </Link>
      ),
      key: "new",
      icon: <TeamOutlined />,
    },
    // {
    //   label: (
    //     <Link onClick={() => setSideBar(false)} to="../profiles">
    //       Integrations
    //     </Link>
    //   ),
    //   key: "integrations",
    //   icon: <PoweroffOutlined />,
    // },
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleExit = () => {
    accountServices.logout().then((res) => {
      if (res.status != 200)
        return toast.error("something went wrong please try again");
    });
    return navigate("../sign-in");
  };
  return (
    <UserProvider>
      <Layout>
        <Header
          className=" p-0 flex lg:hidden lg:bg-transparent "
          style={{ background: "rgba(255,255,255,.8)" }}
        >
          <div className="app-container w-[100%] flex items-center justify-between">
            <div className="demo-logo">
              {" "}
              <Link to="../accounts/dashboard">
                <PaperIcon height={30} className="text-blue-600 text-2xl" />
              </Link>
            </div>

            <Menu theme="light" mode="horizontal">
              <span
                onClick={() => {
                  setSideBar(!sideBar);
                }}
                className="text-primary-500 border-0"
              >
                {sideBar ? (
                  <CloseOutlined className="text-xl" />
                ) : (
                  <MenuOutlined className="text-xl" />
                )}
              </span>
            </Menu>
          </div>
        </Header>
        <div className="prehead"></div>
        <Layout>
          {
            <Sider
              // collapsible
              theme="light"
              collapsed={sideBar ? false : true}
              onCollapse={(value) => setCollapsed(value)}
              className={
                sideBar
                  ? " sidebar show animate__animated animate__slideInLeft"
                  : " sidebar animate__animated animate__slideInLeft"
              }
            >
              <div className="flex flex-col h-full justify-between">
                <div className="lg:flex justify-center hidden mb-14">
                  <Link to="../accounts/dashboard">
                    <PaperIcon className="text-blue-500" height={30} />
                  </Link>
                </div>
                <Menu
                  theme="light"
                  defaultSelectedKeys={"dashb"}
                  mode="inline"
                  items={items}
                  className=" text-slate-600 "
                />
                <div className="flex lg:justify-center gap-3 px-8 lg:px-0  mt-14">
                  <Tooltip
                    theme="light"
                    placement="right"
                    title="Log out"
                    arrow={true}
                  >
                    <LogoutOutlined
                      onClick={() => {
                        handleExit();
                      }}
                      className=" text-base text-slate-600 hover:text-blue-600"
                    />
                  </Tooltip>
                  <span className="lg:hidden ">Logout</span>
                </div>
              </div>
            </Sider>
          }
          <Layout>
            <Content
              className="app-container content-container"
              style={{
                // minHeight: 200,
                background: colorBgContainer,
              }}
            >
              {/* <Breadcrumb
                style={{
                  margin: "16px 0",
                }}
              >
                <ol className="breadcrumbs">
                  {
                    //loop through location variable and create a Breadcrumb for each
                    location.pathname.split("/").map((item) => (
                      <li key={item}>
                        {item === "accounts" ? (
                          <Link to={location.origin + "/accounts/dashboard"}>
                            dashboard
                          </Link>
                        ) : (
                          <Link to={location.origin + "/accounts/" + item}>
                            {item}
                          </Link>
                        )}
                      </li>
                    ))
                  }
                </ol>
              </Breadcrumb> */}
              <div className="mt-20 lg:mt-5">{children}</div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </UserProvider>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
