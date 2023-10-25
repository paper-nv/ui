import { Drawer, Button, Space, Popover, Modal, QRCode } from "antd";
import {
  CheckCircleOutlined,
  CheckOutlined,
  DeleteOutlined,
  DownloadOutlined,
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

const UpdateInvoice = ({ close, data, setState }) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { DF, MF } = converter;
  const invoice = JSON.parse(data) || {};
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
      >
        {<SendOutlined />}
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

      <div className="lg:px-5">
        <div className="pb-10">
          <div className="invoice" id="invoice-wrapper">
            <Watermark content={[""]}>
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
                        <h4 className="lidr uppercase">
                          Invoice: #{invoice.invoiceID}
                        </h4>
                        <div className=" lidress">
                          <p>issued on: {DF(invoice?.issued)}</p>
                          <p>Due: {DF(invoice?.due)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="invoice__paper__body mt-20">
                    <div className="grid grid-cols-10 p-3 invoice__list lead bg-gray-100 text-gray-600">
                      <div className="col-span-5">
                        <p>Description</p>
                      </div>
                      <div className="col-span-2 flex justify-center">
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
                          className="grid grid-cols-10 invoice__list p-3 bg-gray-100 text-gray-600 text-sm"
                        >
                          <div className="col-span-5">
                            <p>{item[0].children}</p>
                          </div>
                          <div className="col-span-2 flex justify-center">
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
                    <div className="grid grid-cols-10 invoice__list lead p-3 bg-gray-600 text-white rounded">
                      <div className="col-span-5">
                        <p>Total Due:</p>
                      </div>
                      <div className="col-span-5 flex justify-end">
                        <p>{MF(invoice.total, invoice.currency)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
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
                    <div className="pl-10">
                      <QRCode
                        color="#4B5563"
                        size={140}
                        value={`https://paperincoice.co/${invoice.invoiceID}`}
                      />
                    </div>
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
            </Watermark>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default UpdateInvoice;
