import "./Dashboard.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import useHandleSession from "../../handler/sessionHandler";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  FileTextOutlined,
  PlusOutlined,
  FilterOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Card, Skeleton, Empty, Button, Popover, Radio } from "antd";
import { Link } from "react-router-dom";
import appServices from "../../services/app/appServices";
import { Area } from "@ant-design/plots";
import converter from "../../utils/converter";

const Dashboard = () => {
  const { DF } = converter;
  const [isLoading, setIsLoading] = useState(true);
  const [stat, setStat] = useState([]);
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  useHandleSession(location.pathname);
  const USER = useContext(UserContext).userDetails?.data;

  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, [activeMonth]);

  const asyncFetch = () => {
    appServices.invoiceStats(activeMonth + 1).then((res) => {
      setStat(res.data);
      console.log(res.data);
      let invoices = [];
      let groups = [];
      const dates = [];
      res.data.dates.forEach((item) => {
        res.data.chart.forEach((data) => {
          data.created_at = DF(data.created_at);
          if (data.created_at == DF(item)) {
            invoices.push(data);
          }
        });
      });

      invoices.forEach((invoice) => {
        if (dates.includes(invoice.created_at)) {
          if (
            groups[dates.indexOf(invoice.created_at)].status === invoice.status
          ) {
            groups[dates.indexOf(invoice.created_at)].count += 1;
          } else {
            groups.push({
              date: invoice.created_at,
              count: 1,
              status: invoice.status,
            });
          }
        } else {
          dates.push(invoice.created_at);
          groups.push({
            date: invoice.created_at,
            count: 1,
            status: invoice.status,
          });
        }
      });
      console.log(groups);
      setData(groups);
    });

    setIsLoading(false);
  };

  const selectMonth = (e) => {
    setActiveMonth(e.target.value);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthGroups = [];

  for (let i = 0; i < 12; i++) {
    monthGroups.push(
      <Radio
        checked={i == new Date().getMonth() ? true : false}
        className="my-2"
        value={i}
      >
        {monthNames[i]}
      </Radio>
    );
  }

  const months = (
    <Radio.Group className="block" onChange={selectMonth}>
      {monthGroups}
    </Radio.Group>
  );

  const config = {
    data: data,
    xField: "date",
    yField: "count",
    seriesField: "status",
  };

  // useEffect(() => {}, [isLoading]);

  return (
    <div>
      <title>Dashboard | Payper</title>

      <div className="mb-6 flex justify-between">
        <div>
          {" "}
          <h3 className="text-2xl font-bold"> Overview</h3>
          <div className="muted capitalize flex items-center">
            <p>Hello, {USER?.fullname.split(" ")[0]} </p>
            <div className="text-xl animate__animated animate__wobble inline">
              👋
            </div>
          </div>
        </div>

        <div>
          <Link to="../accounts/invoices/new">
            <Button
              icon={<PlusOutlined />}
              type="primary"
              className="rounded-3xl h-12"
            >
              New invoice
            </Button>
          </Link>
        </div>
      </div>
      <div className=" ">
        <div className="grid   gap-4 gap-y-6  grid-cols-3 bg-white px-6 lg:px-8 py-10 rounded-xl">
          <div className="bg-white col-span-1  md:col-span-1">
            <div className="flex justify-start items-center gap-2 ">
              <div className="rounded-full p-2 md:p-4 flex justify-center items-start bg-blue-50">
                <FileTextOutlined className="text-blue-300 text-lg md:text-2xl" />
              </div>
              <div>
                <span
                  to="../accounts/invoices"
                  className="text-xs text-slate-500  "
                >
                  Invoices
                </span>
                <h3 className="font-bold text-xl md:text-2xl leading-none  text-slate-600">
                  {stat.totalInvoices}{" "}
                </h3>
              </div>
            </div>
          </div>
          <div className="bg-white col-span-1  md:col-span-1">
            <div className="flex justify-start items-center gap-2 ">
              <div className="rounded-full p-2 md:p-4 flex justify-center items-center bg-green-50">
                <ArrowUpOutlined className="text-green-400 text-lg md:text-2xl" />
              </div>
              <div>
                <span
                  to="../accounts/invoices"
                  className="text-xs text-slate-500  "
                >
                  Paid
                </span>
                <h3 className="font-bold text-xl md:text-2xl leading-none  text-slate-600">
                  {stat.totalPaidInvoices}
                </h3>
              </div>
            </div>
          </div>
          <div className="bg-white col-span-1  md:col-span-1">
            <div className="flex justify-start items-center gap-2 ">
              <div className="rounded-full p-2 md:p-4 flex justify-center items-center bg-red-50">
                <ArrowDownOutlined className="text-red-300 text-lg md:text-2xl" />
              </div>
              <div>
                <span
                  to="../accounts/invoices"
                  className="text-xs text-slate-500  "
                >
                  Pending
                </span>
                <h3 className="font-bold text-xl md:text-2xl leading-none  text-slate-600">
                  {stat.totalOutstandingInvoices}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3  mt-10">
          {isLoading ? (
            <>
              <Skeleton active className="mt-20" />
              <Skeleton active className="mt-20" />
            </>
          ) : (
            <div>
              {stat.totalInvoices ? (
                <div className="p-6 bg-white rounded-xl lg:p-8">
                  <div className="flex justify-end w-full">
                    <div className="flex  mb-2">
                      <div>
                        <Popover content={months}>
                          <Button
                            className="border-0"
                            icon={<CalendarOutlined />}
                          >
                            {" "}
                            {monthNames[activeMonth]}
                          </Button>
                        </Popover>
                      </div>
                    </div>
                  </div>
                  <Area {...config} />
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
                    <span className="muted">
                      You do not have any invoices yet
                    </span>
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
