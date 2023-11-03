import { Modal, Button, Watermark, QRCode } from "antd";
import { DownloadOutlined, SendOutlined } from "@ant-design/icons";
import domtoimage from "dom-to-image";
import toast from "react-hot-toast";
import FileSaver from "file-saver";
import converter from "../../utils/converter";

const PreviewModal = ({ data, close, id }) => {
  const invoice = JSON.parse(data);
  const { MF, DF } = converter;

  const handleDownload = () => {
    window.innerWidth < 600
      ? (document.getElementById("invoice-wrapper").className += " w-[800px]")
      : null;
    domtoimage
      .toBlob(document.getElementById("invoice-wrapper"))
      .then(function (blob) {
        FileSaver.saveAs(blob, invoice.title + ".png");
        window.innerWidth < 600
          ? document
              .getElementById("invoice-wrapper")
              .classList.remove("w-[800px]")
          : null;
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <Modal
      width={1000}
      centered
      cancelButtonProps={{ style: { display: "none" } }}
      open={true}
      okText="Done"
      footer={null}
      onOk={() => close()}
      onCancel={() => close()}
    >
      <div>
        <div className="flex mb-5 pt-10 lg:px-10 px-2 justify-between items-center">
          <div>
            <p className=" font-semibold uppercase">#{id}</p>
          </div>
          <div className="flex gap-2">
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
              Send
            </Button>
          </div>
        </div>

        <div className="invoice" id="invoice-wrapper">
          <Watermark className="bg-white  lg:p-10" content={[""]}>
            <div className="flex px-5 justify-between items-center mb-4">
              <div>
                <p className="text-xl ">{invoice.billFrom.name}</p>
                <p className="opacity-70">{invoice.billFrom.address}</p>
                <p className="opacity-70">{invoice.billFrom.email}</p>
              </div>
              <div>
                <QRCode
                  size={120}
                  value={`https://invoicepaper.vercel.app/verify/${invoice._id}`}
                />
              </div>
            </div>

            <div className="mb-4 p-6 rounded-xl  bg-gray-50 ">
              <div className="flex justify-between">
                <div>
                  <p className="uppercase mb-2 text-gray-400">Due</p>
                  <p className="font-semibold">{DF(invoice?.due)}</p>
                </div>
                <div>
                  <p className="uppercase mb-2 text-gray-400">Issued</p>
                  <p className="font-semibold">{DF(invoice?.issued)}</p>
                </div>
              </div>
            </div>
            <div className="mb-4 p-6 rounded-xl  bg-gray-50 ">
              <div>
                <p className="uppercase mb-2 text-gray-400 ">Billed to</p>
                <p className="font-semibold ">{invoice?.billTo.name}</p>
                <p className="font-semibold ">{invoice?.billTo.address}</p>
                <p className="font-semibold  text-gray-400">
                  {invoice?.billTo.email}
                </p>
              </div>
            </div>
            <div className="mb-4  rounded-xl  bg-gray-50 ">
              <div className="px-6 py-4 grid grid-cols-10 gap-2  ">
                <p className="col-span-5 uppercase text-gray-400">
                  Description
                </p>
                <p className="col-span-2 uppercase text-gray-400">Rate</p>
                <p className="col-span-1 uppercase text-gray-400">QTY</p>
                <p className="col-span-2 uppercase text-gray-400">SUBtotal</p>
              </div>
              {invoice.items.map((item) => {
                return (
                  <div
                    key={invoice.items.indexOf(item) + "ruo"}
                    className="p-6 py-4 lg:py-6 grid grid-cols-10 gap-2"
                  >
                    <p className="col-span-5 font-semibold lg:text-sm text-xs">
                      {item[0].children}
                    </p>
                    <p className="col-span-2 font-semibold lg:text-sm text-xs">
                      {item[1].children.split("x")[0]}
                    </p>
                    <p className="col-span-1 font-semibold lg:text-sm text-xs">
                      {item[1].children.split("x")[1]}
                    </p>
                    <p className="col-span-2 font-semibold lg:text-sm text-xs">
                      {item[2].children}
                    </p>
                  </div>
                );
              })}
              <div
                className="px-6 py-4 grid grid-cols-10 gap-2 font-semibold bg-gray-100 rounded-2xl "
                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
              >
                <p className="col-span-8 uppercase text-gray-400">Total</p>
                <p className="col-span-2 uppercase ">
                  {MF(invoice?.total, invoice.currency)}
                </p>
              </div>
            </div>
            {invoice?.notes ? (
              <div className="mb-4 p-6 rounded-xl  bg-gray-50 ">
                <div>
                  <p className="uppercase mb-2 text-gray-400 ">Notes</p>
                  <p className=" ">{invoice?.notes}</p>
                </div>
              </div>
            ) : null}
          </Watermark>
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
