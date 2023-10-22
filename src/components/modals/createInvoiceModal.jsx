/* eslint-disable no-unused-vars */
import { CloseOutlined } from "@ant-design/icons";
import { SendOutlined } from "@ant-design/icons";
import "./modals.css";
const CreateInvoiceModal = (props) => {
  return (
    <div>
      <div className="modal animate__animated animate__fadeIn">
        <div className="flex justify-center px-[20px]">
          <div className="box bg-white animate__animated animate__bounceIn lg:w-[40vw] md:w-[65vw] ">
            <div className="flex justify-between align-center">
              <div className="box__header">Preview</div>
              <div>
                <button
                  onClick={() => {
                    props.close();
                  }}
                  className=" outline-none hover:bg-white bg-white"
                >
                  <CloseOutlined height="12" />
                </button>
              </div>
            </div>
            <div className="box__body">
              <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  With less than a month to go before the European Union enacts
                  new consumer privacy laws for its citizens, companies around
                  the world are updating their terms of service agreements to
                  comply.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  The European Union’s General Data Protection Regulation
                  (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                  common set of data rights in the European Union. It requires
                  organizations to notify users as soon as possible of high-risk
                  data breaches that could personally affect them.
                </p>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  data-modal-hide="staticModal"
                  type="button"
                  className="text-white flex align-baseline gap-3 bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  <SendOutlined className="pt-[2px]" /> <p>Send</p>
                </button>
                <button
                  data-modal-hide="staticModal"
                  type="button"
                  className="text-white bg-blue-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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

export default CreateInvoiceModal;
