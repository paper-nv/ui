import PropTypes from "prop-types";
import UserProvider from "../context/userContext";
import LogoDark from "../assets/logo/LogoDark";
import "./layout.css";
import {
  TeamOutlined,
  DeploymentUnitOutlined,
  FileOutlined,
  PieChartOutlined,
  PlusOutlined,
  AntDesignOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
const { Header, Content, Sider } = Layout;
import { useState } from "react";

const AppLayout = ({ children }) => {
  const [sideBar, setSideBar] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const items = [
    {
      label: (
        <Link onClick={() => setSideBar(false)} to="../accounts/dashboard">
          {" "}
          Dashboard{" "}
        </Link>
      ),
      key: "dashb",
      icon: <PieChartOutlined />,
    },
    {
      label: (
        <Link onClick={() => setSideBar(false)} to="../accounts/invoices">
          {" "}
          Invoices{" "}
        </Link>
      ),
      key: "invoices",
      icon: <FileOutlined />,
    },
    {
      label: (
        <Link onClick={() => setSideBar(false)} to="../accounts/invoices/new">
          New Invoice
        </Link>
      ),
      key: "profiles",
      icon: <PlusOutlined />,
    },
    {
      label: (
        <Link onClick={() => setSideBar(false)} to="../accounts/profiles">
          Profiles
        </Link>
      ),
      key: "new",
      icon: <TeamOutlined />,
    },
    {
      label: (
        <Link onClick={() => setSideBar(false)} to="../profiles">
          Integrations
        </Link>
      ),
      key: "integrations",
      icon: <DeploymentUnitOutlined />,
    },
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  console.log(sideBar);
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
              <AntDesignOutlined className="text-slate-800 text-2xl" />
            </div>

            <Menu theme="light" mode="horizontal">
              <span
                onClick={() => {
                  setSideBar(!sideBar);
                }}
                className="text-slate-800 border-0"
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
              collapsed={sideBar ? false : true}
              onCollapse={(value) => setCollapsed(value)}
              className={
                sideBar
                  ? "bg-transparent sidebar show animate__animated animate__slideInLeft"
                  : "bg-transparent sidebar animate__animated animate__slideInLeft"
              }
            >
              <div className="lg:flex justify-center hidden ">
                {/* <LogoDark className="text-white" height={15} /> */}
              </div>
              <Menu
                theme="dark"
                defaultSelectedKeys={["1"]}
                mode="inline"
                items={items}
                className=" "
              />
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
