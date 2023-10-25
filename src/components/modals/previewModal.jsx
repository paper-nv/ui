import { Modal, Button } from "antd";
import { DownloadOutlined, SendOutlined } from "@ant-design/icons";
import domtoimage from "dom-to-image";
import toast from "react-hot-toast";
import FileSaver from "file-saver";
import converter from "../../utils/converter";

const PreviewModal = ({ data, close, id }) => {
  const invoice = JSON.parse(data);
  const { MF, DF } = converter;

  const handleDownload = () => {
    document.getElementById("invoice-wrapper").className += " w-[800px]";
    domtoimage
      .toBlob(document.getElementById("invoice-wrapper"))
      .then(function (blob) {
        FileSaver.saveAs(blob, invoice.title + ".png");
        document
          .getElementById("invoice-wrapper")
          .classList.remove("w-[800px]");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <Modal
      title="Invoice Preview"
      width={1000}
      centered
      cancelButtonProps={{ style: { display: "none" } }}
      open={true}
      okText="Done"
      // footer={null}
      onOk={() => close()}
      onCancel={() => close()}
    >
      <div className="lg:px-20">
        <div className="flex mb-5 justify-between">
          <div></div>
          <div className="flex gap-5 pt-10">
            <Button
              onClick={() => handleDownload()}
              className="border-blue-600 text-blue-600"
              icon={<DownloadOutlined />}
            >
              {" "}
              Download
            </Button>
            <Button
              onClick={() =>
                toast("This feature is coming soon!", {
                  icon: "👏",
                  style: {
                    borderRadius: "10px",
                    background: "#000",
                    color: "#fff",
                  },
                })
              }
              type="primary"
              icon={<SendOutlined />}
            >
              {" "}
              Send to mail
            </Button>
          </div>
        </div>

        <div className="py-10">
          <div className="invoice" id="invoice-wrapper">
            <div
              className="invoice__paper rounded bg-gray-50 text-gray-500 border border-gray-200"
              style={{ borderRadius: "15px" }}
            >
              <div className="invoice__paper__header ">
                <div className="invoice__paper__header__logo p-6 bg-gray-100 text-center">
                  <h3> {invoice?.billFrom.name} </h3>
                </div>
              </div>

              <div className="p-[25px]">
                <div className="invoice__paper__header__infopy-[50px] my-[40px] px-2">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="lidr">Billed To:</h4>
                      <div className="lidress">
                        <p>{invoice?.billTo.name}</p>
                        {/* <p>{invoice?.billTo.email}</p> */}
                        <p>{invoice?.billTo.address}</p>
                        {/* <p>{invoice?.billTo.phone}</p> */}
                      </div>
                    </div>

                    <div>
                      <h4 className="lidr">Invoice: #{id}</h4>
                      <div className=" lidress">
                        <p>issued on: {DF(invoice?.issued)}</p>
                        <p>Due: {DF(invoice?.due)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="invoice__paper__body mt-20">
                  <div className="grid grid-cols-10 invoice__list lead bg-gray-100 text-gray-600">
                    <div className="col-span-6">
                      <p>Description</p>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <p>Price</p>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <p>Units</p>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <p>Total</p>
                    </div>
                  </div>
                  {invoice.items.map((item) => {
                    return (
                      <div
                        key={invoice.items.indexOf(item) + "ruo"}
                        className="grid grid-cols-10 invoice__list bg-gray-100 text-gray-600 text-sm"
                      >
                        <div className="col-span-6">
                          <p>{item[0].children}</p>
                        </div>
                        <div className="col-span-1 flex justify-center">
                          <p>{item[1].children.split("x")[0]}</p>
                        </div>
                        <div className="col-span-1 flex justify-center">
                          <p>{item[1].children.split("x")[1]}</p>
                        </div>
                        <div className="col-span-2 flex justify-center">
                          <p>{item[2].children}</p>
                        </div>
                      </div>
                    );
                  })}
                  <div className="grid grid-cols-10 invoice__list lead bg-gray-600 text-white rounded">
                    <div className="col-span-4">
                      <p>Total Due:</p>
                    </div>
                    <div className="col-span-6 flex justify-end">
                      <p>{MF(invoice.total, invoice.currency)}</p>
                    </div>
                  </div>
                </div>
                <div className="py-10  lg:w-[70%]">
                  <p
                    style={{
                      fontSize: ".8rem",
                      opacity: ".8",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {invoice.notes}
                  </p>
                </div>
              </div>

              <div className="invoice__paper__footer bg-gray-100 px-[35px] py-[20px] ">
                <div className="flex justify-between items-center">
                  <div>
                    <h3> {invoice.billFrom.name} </h3>
                  </div>
                  <div className="lidress">
                    <p>{invoice?.billFrom.address}</p>
                    <p>{invoice?.billFrom.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
