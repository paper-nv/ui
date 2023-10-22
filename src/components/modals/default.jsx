/* eslint-disable no-unused-vars */
import { CloseOutlined } from "@ant-design/icons";
import { SendOutlined } from "@ant-design/icons";
import "./modals.css";
import { Link } from "react-router-dom";
const DefaultModal = (props) => {
  return (
    <div>
      <div className="modal animate__animated animate__fadeIn">
        <div className="flex justify-center px-[20px]">
          <div className="box bg-white animate__animated animate__bounceIn lg:w-[40vw] md:w-[65vw] ">
            <div className="text-center align-cente ">
              <h3 className="modal__lead">{props.title}</h3>
              <p className="text-base muted">{props.sub}</p>
            </div>

            <div className="box__body mt-8">
              {props.body}
              <div className="flex justify-center gap-3 mt-10">
                <Link
                  to={props.cta.to}
                  type="button"
                  className="text-white  bg-blue-700  font-medium rounded-lg btn primary px-95 py-2.5 text-center"
                >
                  {props.cta.title}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultModal;
