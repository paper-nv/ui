import "./Dashboard.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import useHandleSession from "../../handler/sessionHandler";
import {
  ArrowDownOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  FileTextOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Card, Skeleton, Empty, Button } from "antd";
import { Link } from "react-router-dom";
import appServices from "../../services/app/appServices";
import { Area } from "@ant-design/plots";
import converter from "../../utils/converter";

const Dashboard = () => {
  const { DF } = converter;
  const [isLoading, setIsLoading] = useState(true);
  const [stat, setStat] = useState([]);
  const USER = useContext(UserContext).userDetails?.data;
  useHandleSession(location.pathname);

  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    appServices.invoiceStats().then((res) => {
      console.log(res);
      setStat(res.data);
      let invoices = [];
      res.data.invoices.forEach((item) => {
        // Group invoices by date
        let date = DF(item.created_at);
        let total = item.total;
        let status = item.status;
        let count = 1;
        let invoice = invoices.find((item) => DF(item.created_at) === date);
        if (invoice) {
          invoice.count += count;
          invoice.total += total;
          invoice.status = status;
        } else {
          invoices.push({
            created_at: date,
            total,
            status,
            count,
          });
        }
      });
      console.log(invoices);
      setData(invoices);
    });

    setIsLoading(false);
  };
  const config = {
    data: data,
    xField: "created_at",
    yField: "count",
    seriesField: "status",
  };

  // useEffect(() => {}, [isLoading]);

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <div>
          {" "}
          <h3 className="text-2xl font-bold"> Dashboard</h3>
          <span className="muted">Hello {USER?.fullname} </span>
        </div>

        <div>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            className="rounded-3xl"
          >
            New invoice
          </Button>
        </div>
      </div>
      <div className="">
        <div className="md:grid gap-4 grid-cols-3">
          <Card className="bg-white mb-4 col-span-1" bordered={false}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-2xl  text-slate-600">
                  {stat.totalInvoices}{" "}
                </h3>
                <Link
                  to="../accounts/invoices"
                  className="text-sm text-slate-500 tracking-[2px] font-normal"
                >
                  Invoices <ArrowRightOutlined />
                </Link>
              </div>
              <div>
                <div className="rounded-full p-4 flex justify-center items-center bg-blue-50">
                  <FileTextOutlined className="text-blue-300 text-2xl" />
                </div>
              </div>
            </div>
          </Card>
          <Card className="bg-white mb-4 col-span-1" bordered={false}>
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-2xl text-slate-600">
                  {stat.totalPaidInvoices}
                </h3>
                <Link
                  to="../accounts/invoices"
                  className="text-sm text-slate-500 font-normal tracking-[2px]"
                >
                  Paid <ArrowRightOutlined />
                </Link>
              </div>
              <div>
                <div className="rounded-full p-4 flex justify-center items-center bg-green-50">
                  <ArrowUpOutlined className="text-green-400 text-2xl" />
                </div>
              </div>
            </div>
          </Card>
          <Card className="bg-white mb-4 col-span-1" bordered={false}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-2xl  text-slate-600">
                  {stat.totalOutstandingInvoices}
                </h3>
                <Link
                  to="../accounts/invoices"
                  className="text-sm text-slate-500 font-normal tracking-[2px]"
                >
                  Pending <ArrowRightOutlined />
                </Link>
              </div>
              <div>
                <div className="rounded-full p-4 flex justify-center items-center bg-red-50">
                  <ArrowDownOutlined className="text-red-300 text-2xl" />
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-span-3 mt-10 ">
          {isLoading ? (
            <>
              <Skeleton active className="mt-20" />
              <Skeleton active className="mt-20" />
            </>
          ) : (
            <div>
              {stat.totalInvoices ? (
                <Card className="bg-white rounded-3xl">
                  <Area {...config} />
                </Card>
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
