import { NavLink } from "react-router-dom";
import "./SideBar.css";
import Dashboard from "../../assets/icons/Dashboard";
import People from "../../assets/icons/People";
import Integration from "../../assets/icons/Integration";
import Invoice from "../../assets/icons/invoice";
import LogoDark from "../../assets/logo/logoDark";
import { ProfileOutlined } from "@ant-design/icons";
import { useState } from "react";

const SideBar = (props) => {
  const [DD1Slide, setDD1Slide] = useState(false);
  //create a sidebar
  return (
    <div className={props.toggleState ? "sidebar show" : "sidebar "}>
      <div className="sidebar__header">
        <LogoDark />
      </div>
      <div className="sidebar__menu">
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/accounts/dashboard/"
            >
              <Dashboard />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="../accounts/invoices"
              onClick={() => {
                setDD1Slide(!DD1Slide);
              }}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <Invoice />
              <span>Invoices</span>
            </NavLink>
            {DD1Slide && (
              <div className="nav-child ml-[32px]">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active my-[10px] " : "inactive my-[10px]"
                  }
                  to="../accounts/invoices/"
                >
                  My invoices
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active my-[10px]" : "inactive my-[10px]"
                  }
                  to="../accounts/invoices/new"
                >
                  New invoice
                </NavLink>
              </div>
            )}
          </li>
          <li>
            <NavLink
              to="../accounts/profiles"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <ProfileOutlined />
              <span>Profiles</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="../accounts/customers"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <People />
              <span>Customers</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="integrations"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <Integration />
              <span>Integrations</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
