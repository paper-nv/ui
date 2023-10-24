import { HeartFilled } from "@ant-design/icons";
import { Button } from "antd";
import PaperLogo from "../assets/logo/Paper";
import {
  FundTwoTone,
  ToolTwoTone,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import "./home.css";
import { Footer } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white">
      <nav
        className={
          document.getElementById("root").scrollHeight > 10
            ? "navbar isFixed"
            : "navbar"
        }
      >
        <div className="app-container">
          <div className="flex justify-between items-center  py-5">
            <div className="navbar__logo">
              <PaperLogo className="text-blue-600" height="60" />
            </div>

            <div className="flex gap-4">
              <Link to="/sign-up">
                <Button className="lg:px-10 border-0 hidden lg:inline-block">
                  Sign up
                </Button>
              </Link>
              <Link to="/sign-in">
                <Button className="lg:px-10 text-white" type="primary">
                  Log in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="hero pt-20 ">
        <div className=" text-center app-container">
          <h1 className="lg:text-6xl text-3xl  font-semibold animate__animated animate__slideInUp">
            Seamless Invoicing
          </h1>
          <p className=" font-normal animate__animated animate__slideInUp lg:text-lg text-sm text-slate-600 mt-5">
            Say goodbye to manual invoicing. Streamline your invoicing process
            <br />
            Keep track of status and insights
          </p>
          <div className="mt-7">
            <Link to="/sign-up">
              <Button
                className="px-5 animate__animated animate__slideInUp"
                type="primary"
              >
                <span>Get started</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center bgImg animate__animated animate__slideInUp">
          <div className=" h-[450px] overflow-hidden flex  justify-center lg:block   lg:p-0 px-4">
            <img
              src={
                window.innerWidth > 600
                  ? "https://res.cloudinary.com/hnrchris/image/upload/v1698164934/assets/sshot_nrcgnb.png"
                  : "https://res.cloudinary.com/hnrchris/image/upload/v1698164943/assets/sshot2_l8kzch.png"
              }
              className="rounded-3xl   lg:w-[900px] lg:h-[auto] h-[440px] mt-20 animate__animated animate__slideInUp"
            />
          </div>
        </div>
      </div>

      <section className=" py-20">
        <div className="app-container">
          <div className="lg:grid grid-cols-3 gap-y-10 gap-10">
            <div className="col-span-1">
              <div className="text-center mb-10 animate__animated animate__slideInUp">
                <div>
                  <FundTwoTone className="text-5xl mb-2 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">All in one place</h3>
                  <p className="text-sm text-slate-400">
                    Create, manage and organize invoices of multiple entities in
                    one platform
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="text-center mb-10 animate__animated animate__slideInUp">
                <div>
                  <ToolTwoTone className="text-5xl mb-2 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Flexible & Customizable</h3>
                  <p className="text-sm text-slate-400">
                    Send invoices directly to clients email addresses, create
                    and download invoices in all currencies
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="text-center mb-10 animate__animated animate__slideInUp">
                <div>
                  <ToolTwoTone className="text-5xl mb-2 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Flexible & Customizable</h3>
                  <p className="text-sm text-slate-400">
                    Send invoices directly to clients email addresses, create
                    and download invoices in all currencies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer className="bg-slate-100">
        <div className="flex justify-between items-center app-container">
          <div className="text-slate-600">
            ©{` ${new Date().getFullYear()} ${import.meta.env.VITE_APPNAME}`}
          </div>
          <div className=" justify-center flex gap-4 text-lg  ">
            <Link className="text-gray-400 hover:text-blue-600" top="">
              <LinkedinOutlined />
            </Link>
            <Link top="" className="text-gray-400 hover:text-blue-600">
              <TwitterOutlined />
            </Link>
          </div>

          <div className="hidden md:block text-slate-600">
            Made with <HeartFilled /> Chida
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default Home;
