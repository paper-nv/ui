import "./NavBar.css";
import Menu from "../../assets/icons/menu";
import { useState } from "react";
import SideBar from "../sidebar/SideBar";
import LogoDark from "../../assets/logo/logoDark";

const NavBar = () => {
  const [navToggle, setNavToggle] = useState(false);

  const toggleNav = () => {
    setNavToggle(!navToggle);
  };
  return (
    <>
      <SideBar toggleState={navToggle} />
      <nav className=" navbar bg-white  py-6 ">
        <div className="flex main__container justify-between">
          <div className="flex items-center flex-shrink-0 text-dark mr-6 lg:hidden">
            <LogoDark />
          </div>
          <div>
            <div className="block lg:hidden">
              <button
                onClick={() => {
                  toggleNav();
                }}
                className="flex items-center px-3 py-2 bg-white border rounded text-teal-lighter border-teal-light hover:text-dark hover:border-dark"
              >
                <Menu height="12px" />
              </button>
            </div>
            <div className="w-full lg:block hidden flex-grow lg:flex lg:items-center lg:w-auto">
              <div className="text-sm lg:flex-grow">
                <a
                  href="#responsive-header"
                  className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-dark mr-4"
                >
                  Docs
                </a>
                <a
                  href="#responsive-header"
                  className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-dark mr-4"
                >
                  Examples
                </a>
                <a
                  href="#responsive-header"
                  className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-dark"
                >
                  Blog
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="inline-block text-sm px-4 py-2 leading-none border rounded text-dark border-dark hover:border-transparent hover:text-teal hover:bg-dark mt-4 lg:mt-0"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
