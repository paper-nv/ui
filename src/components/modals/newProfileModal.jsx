/* eslint-disable no-unused-vars */
import { CloseOutlined } from "@ant-design/icons";
import { SendOutlined } from "@ant-design/icons";
import "./modals.css";
const NewProfileModal = (props) => {
  return (
    <div>
      <div className="modal animate__animated animate__fadeIn">
        <div className="flex justify-center px-[20px]">
          <div className="box bg-white animate__animated animate__bounceIn lg:w-[40vw] md:w-[65vw] ">
            <div className="flex justify-between align-center">
              <div className="box__header">Add a new Profile</div>
              <div>
                <button
                  onClick={() => {
                    props.close();
                  }}
                  className="text-gray-500 hover:text-gray-900 outline-none hover:bg-white bg-white"
                >
                  <CloseOutlined height="12" />
                </button>
              </div>
            </div>
            <div className="box__body">
              <div className="form-group ">
                <label>Profile Name</label>
                <input placeholder="Profile name" />
              </div>
              <div className="form-group ">
                <label>Profile Address</label>
                <input placeholder="Profile name" />
              </div>
              <div className="form-group ">
                <label>Profile Logo</label>
                <input placeholder="Profile name" type="file" />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => props.close()}
                  type="button"
                  className="text-white flex align-baseline gap-3  bg-blue-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  <p>Cancel</p>
                </button>
                <button
                  type="button"
                  className="text-white  bg-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProfileModal;
