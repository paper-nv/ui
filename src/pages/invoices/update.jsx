import { Drawer, Button, Space, Popover, Modal, QRCode, Card } from "antd";
import {
  CheckCircleOutlined,
  CheckOutlined,
  DeleteOutlined,
  DownloadOutlined,
  LoadingOutlined,
  MoreOutlined,
  QuestionCircleOutlined,
  QuestionCircleTwoTone,
  SendOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import domtoimage from "dom-to-image";
import toast from "react-hot-toast";
import FileSaver from "file-saver";
import converter from "../../utils/converter";
import appServices from "../../services/app/appServices";
import { useState } from "react";
import { Watermark } from "antd";
import axios from "axios";

const UpdateInvoice = ({ close, data, setState }) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { DF, MF } = converter;
  const invoice = JSON.parse(data) || {};
  const handleDownload = () => {
    window.innerWidth < 600
      ? (document.getElementById("invoice-wrapper").className += " w-[650px]")
      : null;
    domtoimage
      .toBlob(document.getElementById("invoice-wrapper"))
      .then(function (blob) {
        FileSaver.saveAs(blob, invoice.title + ".png");
        window.innerWidth < 600
          ? document
              .getElementById("invoice-wrapper")
              .classList.remove("w-[650px]")
          : null;
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const handleSend = () => {
    setConfirmLoading(true);
    window.innerWidth < 600
      ? (document.getElementById("invoice-wrapper").className += " w-[650px]")
      : null;

    domtoimage
      .toBlob(document.getElementById("invoice-wrapper"))
      .then(function (blob) {
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          var base64data = reader.result;

          axios
            .post("https://api.cloudinary.com/v1_1/hnrchris/image/upload", {
              upload_preset: "iojqahlz",
              api_key: "177267422853236",
              timestamp: new Date(),
              file: base64data,
            })
            .then((res) => {
              appServices
                .sendInvoice({
                  data: res.data.secure_url,
                  email: invoice.billTo.email,
                })
                .then((res) => {
                  setConfirmLoading(false);

                  res.data.status === "success"
                    ? toast.success("Invoice sent to " + invoice.billTo.email)
                    : toast.error(" failed to mail invoice");
                });
            });
          console.log();
        };

        window.innerWidth < 600
          ? document
              .getElementById("invoice-wrapper")
              .classList.remove("w-[650px]")
          : null;
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const menu = (
    <div className="p-2">
      <p
        onClick={() => handleDownload()}
        className="flex gap-2 cursor-pointer hover:text-blue-600 pb-2 border-b"
      >
        {<DownloadOutlined />}
        Download
      </p>

      <p
        key={2}
        className="flex gap-2 pt-2 cursor-pointer hover:text-blue-600"
        onClick={() => handleSend()}
      >
        {confirmLoading ? <LoadingOutlined /> : <SendOutlined />}
        Send to mail
      </p>
    </div>
  );

  const update = (data) => {
    setConfirmLoading(true);
    appServices.updateInvoice(data).then((res) => {
      if (res.status === 200) {
        setConfirmLoading(false);
        toast.success("Invoice status updated");
        setUpdateModal(false);
        setState(true);
        return;
      }

      return toast.error("Failed to update invoice. Please try again later");
    });
  };

  // delete invoice function
  const deleteInvoice = (data) => {
    setConfirmLoading(true);
    appServices.deleteInvoice(data).then((res) => {
      if (res.status === 200) {
        setConfirmLoading(false);
        toast.success("Invoice deleted");
        setDeleteModal(false);
        setState(true);

        close(false);
        return;
      }

      return toast.error("Failed to delete invoice. Please try again later");
    });
  };

  return (
    <Drawer
      title={invoice?.invoiceID}
      placement="right"
      size={"large"}
      onClose={() => close(false)}
      open={true}
      extra={
        <Space>
          {invoice.status !== "paid" ? (
            <Button
              onClick={() => setUpdateModal(true)}
              type="primary"
              icon={<CheckOutlined />}
            >
              {" "}
              Mark Paid
            </Button>
          ) : (
            <Button
              className="text-green-600 border-0 cursor-default"
              icon={<CheckCircleOutlined />}
            >
              Paid
            </Button>
          )}
          <Button
            onClick={() => setDeleteModal(true)}
            className="border-red-600 text-red-600"
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
          <Popover content={menu}>
            <Button icon={<MoreOutlined />}></Button>
          </Popover>
        </Space>
      }
    >
      <Modal
        centered
        open={updateModal}
        okText="Yes, Proceed"
        onOk={() => update({ id: invoice._id })}
        confirmLoading={confirmLoading}
        onCancel={() => setUpdateModal(false)}
      >
        <div className="py-20 flex justify-center">
          <div className="">
            <div className="pb-4 text-center">
              <QuestionCircleTwoTone style={{ fontSize: "3rem" }} />
            </div>
            <Title level={4} className="text-lg text-center">
              Mark as paid
            </Title>
            <p>
              You are about to set the status of invoice{" "}
              <b>#{invoice.invoiceID}</b> to paid . You can not undo this later.
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        centered
        open={deleteModal}
        okText="Yes, Proceed"
        onOk={() => deleteInvoice(invoice._id)}
        okButtonProps={{ danger: true }}
        confirmLoading={confirmLoading}
        onCancel={() => setDeleteModal(false)}
      >
        <div className="py-20 flex justify-center">
          <div className="">
            <div className="pb-4 text-center">
              <QuestionCircleOutlined
                className="text-red-400"
                style={{ fontSize: "3rem" }}
              />
            </div>
            <Title level={4} className="text-lg text-center">
              Delete Invoice
            </Title>
            <p>
              You are about to delete invoice <b>#{invoice.invoiceID}</b>. This
              action is irreversible.
            </p>
          </div>
        </div>
      </Modal>

      <div className="lg:px-5 ">
        <div className="">
          <div className="invoice  bg-white" id="invoice-wrapper">
            <Watermark className="py-10" content={[""]}>
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
                  className="px-6 py-4 grid grid-cols-10 gap-2 rounded-2xl font-semibold bg-gray-100 "
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
      </div>
    </Drawer>
  );
};

export default UpdateInvoice;
