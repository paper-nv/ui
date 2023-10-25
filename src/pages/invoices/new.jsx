import { Card, Descriptions, Select, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { Button } from "antd";
import {
  DownloadOutlined,
  ExportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { DeleteOutlined } from "@ant-design/icons";
import SelectUi from "../../components/form/SelectUi";
import appServices from "../../services/app/appServices";
import currencies from "../../data/currencies";
import ProfileModal from "../../components/modals/ProfileModal";
import ProfileModalCustom from "../../components/modals/ProfileModalCustom";
import EntryModal from "../../components/modals/entryModal";
// import SelectTemplateModal from "../../components/modals/selectTemplateModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import { DatePicker, Empty } from "antd";
import PreviewModal from "../../components/modals/previewModal";
import converter from "../../utils/converter";
import { useNavigate } from "react-router-dom";
import useHandleSession from "../../handler/sessionHandler";

const Newinvoice = () => {
  useHandleSession(location.pathname);
  const { MF } = converter;
  const { RangePicker } = DatePicker;
  const [openModal, setOpenModal] = useState(false);
  const [entries, setEntries] = useState([]);
  const [currency, setCurrency] = useState("$");
  const [isLoading, setIsLoading] = useState(true);
  const [companyList, setCompanyList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [newModal, setNewModal] = useState(false);
  const [customModal, setCustomModal] = useState(false);
  // const [templateModal, setTemplateModal] = useState(false);
  const [previewModal, setPreviewModal] = useState({ state: false, id: null });
  const [invoice, setInvoice] = useState();
  const [trigger, setTrigger] = useState(false);
  const navigate = useNavigate();
  // const { invoiceID, setInvoiceID } = useState(null);

  const schema = yup.object().shape({
    title: yup
      .string()
      .min(3, "title must be at least 3 characters")
      .max(255)
      .required("title is required"),
    billFrom: yup
      .string()
      .typeError("invalid profile format")
      .required("Sender Profile is required"),
    billTo: yup
      .string()
      .typeError("invalid profile format")
      .required("recipient Profile is required"),
    currency: yup
      .string()
      .min(1, "Select a valid currency")
      .typeError("invalid profile format")
      .required("Currency is required"),
    issued: yup
      .date()
      .typeError("issued date must be a date entry")
      .required("issue and due date are required"),
    due: yup
      .date()
      .typeError("issued date must be a date")
      .required("issue and due date are required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isLoading) {
      setCompanyList([]);
      appServices.companyList("page=1&limit=1000").then((res) => {
        res.data.data.docs.map((item) => {
          let newEntry = {
            label: item.name,
            value: JSON.stringify(item),
            key: item._id,
          };
          setCompanyList((companyList) => [...companyList, newEntry]);
          //end loop when condition is met
        });
      });
      setCustomerList([]);

      appServices.customerList("page=1&limit=1000").then((res) => {
        res.data.data.docs.map((item) => {
          let newEntry = {
            label: item.name,
            value: JSON.stringify(item),
            key: item._id,
          };
          setCustomerList((customerList) => [...customerList, newEntry]);
          //end loop when condition is met
        });
      });
      setIsLoading(false);
    }
  }, [isLoading]);

  const deleteItem = (N3key) => {
    return () => {
      // toggle animation class animation slideInUp
      // const Element = document.getElementById("desc" + N3key);
      // Element.classList += " animate__slideOutRight";

      let N3s = entries;
      N3s.splice(N3key, 1);
      setEntries(N3s);
      setTimeout(() => {
        setTrigger(!trigger);
      }, 300);
    };
  };

  const newEntry = (data) => {
    data[3] = data[2].children;
    data[1].children =
      MF(parseFloat(`${data[1].children.split("x")[0]}`), currency) +
      ` x ${data[1].children.split("x")[1]}`;
    data[2].children = MF(parseFloat(`${data[2].children}`), currency);
    let N3s = entries.filter((item) => item !== undefined);
    let entry = [...N3s, data];
    if (data != undefined || data.length > 0) {
      setEntries(entry);
      setOpenModal(false);
    }
    return;
  };

  const addtoList = (item) => {
    setCompanyList([
      ...companyList,
      {
        label: item.name,
        value: JSON.stringify(item),
        Key: Math.floor(Math.random() * 10),
      },
    ]);
  };

  const addtoCustomList = (item) => {
    setCustomerList([
      ...customerList,
      {
        label: item.name,
        value: JSON.stringify(item),
        Key: Math.floor(Math.random() * 10),
      },
    ]);
  };

  const { mutate } = useMutation(
    (payload) => appServices.createInvoice(payload),
    {
      onError: (error) => {
        toast.error(
          error.response.data.message ||
            "something went wrong. Please try again"
        );
      },
      onSuccess: (response) => {
        if (response.status === 200) {
          toast.success("invoice generated successfully");
          setPreviewModal({ state: true, id: response.data.invoiceID });
        } else {
          toast.error("something went wrong. Please wait awhile and try again");
        }
      },
    }
  );

  const close = () => {
    setPreviewModal({ state: false, id: null });
    navigate("../accounts/invoices");
  };

  function handleInvoice(payload) {
    // get sum of total from entries
    let total = 0;
    entries.map((item) => {
      total += parseFloat(item[3]);
    });
    payload.total = total;
    console.log("total", total);
    let data = {
      ...payload,
      items: entries,
      billFrom: JSON.parse(payload.billFrom),
      billTo: JSON.parse(payload.billTo),
    };
    mutate(data);
    setInvoice(JSON.stringify(data));
  }

  return (
    <>
      {newModal && <ProfileModal close={setNewModal} add={addtoList} />}
      {customModal && (
        <ProfileModalCustom close={setCustomModal} add={addtoCustomList} />
      )}
      {previewModal.state && (
        <PreviewModal close={close} data={invoice} id={previewModal.id} />
      )}
      {/* {templateModal && (
        <SelectTemplateModal close={setTemplateModal} setSelected={setValue} />
      )} */}
      {openModal && (
        <EntryModal
          close={setOpenModal}
          no={entries.length + 1}
          currency={currency}
          add={newEntry}
        />
      )}
      <div className="flex justify-between mb-9">
        <div className="">
          <h3 className="text-2xl font-bold   animate__animated animate__slideInUp">
            {" "}
            New Invoice
          </h3>
          <p className="muted  animate__animated animate__slideInUp">
            Create a new invoice
          </p>
        </div>

        <div className="flex items-center gap-3"></div>
      </div>
      <Card
        bordered={true}
        className="bg-white animate__animated animate__slideInUp "
      >
        <form
          onSubmit={handleSubmit((payload) => handleInvoice(payload))}
          className="lg:grid grid-cols-12 gap-4"
        >
          <div className="col-span-4 px-3 pb-10 conform lg:pr-[40px]">
            {isLoading ? (
              <>
                {" "}
                <Skeleton className="mt-10" />
                <Skeleton className="mt-20" />
              </>
            ) : (
              <div>
                <Title className="pb-5" level={5}>
                  New Invoice
                </Title>
                <div className="form-group mb-5">
                  <label>Invoice title</label>
                  <input
                    placeholder="Invoice title or description"
                    {...register("title")}
                  />
                  {<h2 className="error-message">{errors?.title?.message}</h2>}
                </div>
                <div className="form-group mb-5">
                  <div className="flex justify-between items-baseline">
                    <label>Bill From</label>

                    <span
                      onClick={() => setNewModal(true)}
                      className="hover:text-blue-500 muted cursor-pointer text-sm"
                    >
                      <PlusOutlined /> create profile
                    </span>
                  </div>
                  <SelectUi
                    placeholder="select a profile"
                    options={companyList}
                    action={setValue}
                    name="billFrom"
                  />
                  {
                    <h2 className="error-message mt-2">
                      {errors?.billFrom?.message}
                    </h2>
                  }
                </div>
                <div className="form-group mb-5">
                  <div className="flex justify-between items-baseline">
                    <label>Bill to</label>

                    <span
                      onClick={() => setCustomModal(true)}
                      className="hover:text-blue-500 muted cursor-pointer text-sm"
                    >
                      <PlusOutlined /> create profile
                    </span>
                  </div>
                  <SelectUi
                    showSearch
                    placeholder="select a profile"
                    options={customerList}
                    action={setValue}
                    name="billTo"
                  />
                  {
                    <h2 className="error-message mt-2">
                      {errors?.billTo?.message}
                    </h2>
                  }
                </div>
                <div className="form-group mb-5">
                  <div className="flex justify-between items-baseline">
                    <label>Issue & Due Dates</label>
                  </div>
                  <RangePicker
                    onChange={(date) => {
                      setValue("issued", date[0].$d);
                      setValue("due", date[1].$d);
                    }}
                    placeholder={["Issued On", "Due On"]}
                    className="w-[100%]"
                  />
                  {
                    <h2 className="error-message mt-2">
                      {errors?.issued?.message || errors?.due?.message}
                    </h2>
                  }
                </div>
                <div className="form-group mb-5">
                  <div className="flex justify-between items-baseline">
                    <label>Invoice Currency</label>
                  </div>

                  <Select
                    className="block w-[100%]"
                    showSearch
                    placeholder="select a currency"
                    optionFilterProp="children"
                    onChange={(v) => {
                      setValue("currency", v);
                      setCurrency(v);
                    }}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={currencies}
                  />
                  {
                    <h2 className="error-message mt-2">
                      {errors?.currency?.message}
                    </h2>
                  }
                </div>

                <div className="form-group mb-5">
                  <label>Additional Notes</label>
                  <textarea
                    rows={4}
                    placeholder="Select a template"
                    {...register("notes")}
                  />
                  {<h2 className="error-message">{errors?.note?.message}</h2>}
                </div>
                <div
                  style={{ zIndex: 4 }}
                  className="bg-white flex gap-4  justify-center lg:relative fixed bottom-0 w-[100%] left-0 py-4"
                >
                  <button
                    onClick={() => setTrigger(false)}
                    type={entries.length ? "submit" : "button"}
                    className={
                      entries.length
                        ? "bg-gray-800 text-gray-200 btn lg:w-[100%]"
                        : "bg-gray-800 opacity-40 text-gray-200 btn lg:w-[100%]"
                    }
                  >
                    <DownloadOutlined /> Save
                  </button>
                  <button
                    onClick={() => setTrigger(true)}
                    type={entries.length ? "submit" : "button"}
                    className={
                      entries.length
                        ? "primary btn lg:w-[100%]"
                        : "primary btn lg:w-[100%] lg:w-[100%] opacity-40"
                    }
                  >
                    <ExportOutlined /> Preview and Send
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="col-span-8 rounded">
            <Title className="pb-5" level={5}>
              Item List
            </Title>
            {entries.map((entry) => {
              return (
                <Descriptions
                  key={entries.indexOf(entry)}
                  id={"desc" + entries.indexOf(entry)}
                  className="describr animate__animated animate__slideInUp  "
                  extra={
                    <Button
                      onClick={deleteItem(entries.indexOf(entry))}
                      danger
                      className="deleteItemBtn"
                    >
                      <DeleteOutlined />
                    </Button>
                  }
                  bordered
                  items={entry}
                />
              );
            })}
            {entries.length ? (
              <div className="flex mt-4 justify-end gap-3 mb-20">
                <Button
                  onClick={() => setOpenModal(true)}
                  type="primary"
                  className="w-[100%] lg:w-[unset] rounded-3xl hover:bg-white hover:text-black hover:border"
                  icon={<PlusOutlined />}
                >
                  New entry
                </Button>
              </div>
            ) : null}

            {entries.length < 1 ? (
              <div className="flex justify-center  py-[150px]">
                <div>
                  <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{
                      height: 60,
                      display: "flex",
                      justifyContent: "center",
                    }}
                    description={
                      <span className="muted">
                        Create an entry by clicking the New Entry button
                      </span>
                    }
                  >
                    <Button
                      onClick={() => setOpenModal(true)}
                      type="primary"
                      className="rounded-3xl"
                      icon={<PlusOutlined />}
                    >
                      New entry
                    </Button>
                  </Empty>
                </div>
              </div>
            ) : null}
          </div>
        </form>
      </Card>
    </>
  );
};

export default Newinvoice;
