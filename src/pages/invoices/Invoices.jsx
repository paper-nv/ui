import "./invoices.css";
import {
  Card,
  Skeleton,
  Pagination,
  Button,
  Dropdown,
  Radio,
  Empty,
} from "antd";
import {
  ExportOutlined,
  FilterOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import converter from "../../utils/converter";
import { useState, useEffect } from "react";
import appServices from "../../services/app/appServices";
import { Link } from "react-router-dom";
import UpdateInvoice from "./update";
import useHandleSession from "../../handler/sessionHandler";

const Invoices = () => {
  useHandleSession(location.pathname);
  const { MF, DF } = converter;
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [pages, setPages] = useState(0);
  const [options, setOptions] = useState();
  const [current, setCurrent] = useState(1);
  const [filter, setFilter] = useState("");
  const [checked, setChecked] = useState("");
  const [invoice, setInvoice] = useState();
  const [invoiceDrawer, setInvoiceDrawer] = useState(false);

  useEffect(() => {
    isLoading
      ? appServices.invoiceList(options || "page=1&limit=10&").then((res) => {
          setList(res.data.invoices);
          setPages(Number(res.data.totalPages * res.data.limit));
          setIsLoading(false);
        })
      : null;
  }, [isLoading, options]);

  const pager = (page) => {
    setCurrent(page);
    setOptions(`page=${page}&limit=10&filter=${filter}`);
    setIsLoading(true);
  };

  const filterList = (e) => {
    //uncheck other checkboxes
    setOptions(`page=1&limit=10&filter=${filter}`);
    setChecked(e.target.value);
    appServices
      .invoiceList(`page=1&limit=10&filter=${e.target.value}`)
      .then((res) => {
        setList(res.data.invoices);
        setPages(Number(res.data.totalPages * res.data.limit));
      });
  };

  const items = [
    {
      key: "2",
      label: (
        <Radio.Group onChange={filterList}>
          <Radio className="my-2" value={"paid"}>
            Paid
          </Radio>
          <Radio value={"unpaid"}>Unpaid</Radio>
        </Radio.Group>
      ),
    },
    {
      key: "3",
      label: (
        <b
          onClick={() => {
            setFilter("");
            setChecked("");
            pager(1);
          }}
        >
          Clear filters
        </b>
      ),
    },
  ];


  return (
    <div>
      <title>My Invoices | Payper</title>

      <div className="flex justify-between mb-10">
        <div className="">
          <h3 className="text-2xl font-bold"> Invoices</h3>
          <span className="muted">All invoices</span>
        </div>

        {list.length ? (
          <div className="flex items-center gap-3">
            <div>
              <Dropdown menu={{ items }} placement="bottom" arrow>
                <Button className="flex items-center border-0">
                  <FilterOutlined />
                  <p className="hidden pl-2 lg:inline">Filter</p>
                </Button>
              </Dropdown>
            </div>
            <div>
              <Link to="./new">
                <Button
                  type="primary"
                  className="Badge py-6 flex items-center "
                  style={{ borderRadius: "25px" }}
                  icon={<PlusOutlined />}
                >
                  New Invoice
                </Button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
      {isLoading ? (
        <>
          <Skeleton active className="mt-20" />
          <Skeleton active className="mt-20" />
        </>
      ) : (
        <div>
          {list.length ? (
            <div>
              {list.map((item) => {
                return (
                  <div key={item._id}>
                    <Card
                      onClick={() => {
                        setInvoice(item);
                        setInvoiceDrawer(true);
                      }}
                      className="bg-white mb-4 card list animate__animated animate__slideInUp"
                    >
                      <div className="grid grid-cols-12 justify-between gap-2 items-center ">
                        <div className="lg:col-span-8 col-span-12">
                          <div className="grid grid-cols-10 justify-between gap-y-5 gap-x-5 items-center">
                            <div className="col-span-10 lg:col-span-7 flex justify-between gap-2 items-center">
                              <div className="lg:flex justify-between gap-2 lg:w-[80%]">
                                <p className="text-slate-700  font-semibold uppercase">
                                  <span className="text-slate-500">#</span>
                                  {item.invoiceID}{" "}
                                </p>

                                <p
                                  className="text-slate-500 lg:flex items-start lg:w-[70%]"
                                  style={{ whiteSpace: "break-spaces" }}
                                >
                                  {" "}
                                  {item.title}
                                </p>
                              </div>

                              {item.status === "paid" ? (
                                <span className="badge bg-green-100 text-green-600">
                                  paid
                                </span>
                              ) : (
                                <span className="badge bg-red-100 text-red-500">
                                  unpaid
                                </span>
                              )}
                            </div>
                            <div className="col-span-10 lg:col-span-3">
                              <p className="text-slate-500 flex gap-3">
                                Due {` `} {DF(item.due)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="lg:col-span-4 col-span-12">
                          <div className="flex justify-between items-center">
                            <div className="flex gap-3 items-center justify-between">
                              <p className="text-slate-700  font-semibold ">
                                <span>{MF(item.total, item.currency)}</span>
                              </p>
                            </div>
                            <div>
                              <ExportOutlined className=" muted" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}

              <div className="flex justify-end mt-10">
                <Pagination
                  onChange={(e) => pager(e)}
                  defaultCurrent={1}
                  current={current}
                  defaultPageSize={10}
                  total={pages}
                />
              </div>
            </div>
          ) : (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
                display: "flex",
                justifyContent: "center",
              }}
              description={
                <span className="muted">You do not have any invoices yet</span>
              }
            >
              <Link to="../accounts/invoices/new">
                {" "}
                <Button
                  type="primary"
                  className="rounded-3xl"
                  icon={<PlusOutlined />}
                >
                  Create an invoice
                </Button>
              </Link>
            </Empty>
          )}
        </div>
      )}

      {invoiceDrawer && (
        <UpdateInvoice
          close={setInvoiceDrawer}
          data={JSON.stringify(invoice)}
          setState={setIsLoading}
        />
      )}
    </div>
  );
};

export default Invoices;
