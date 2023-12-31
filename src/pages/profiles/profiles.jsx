import { Tabs } from "antd";
import Billing from "./billing";
import Customer from "./Customers";
import useHandleSession from "../../handler/sessionHandler";

const items = [
  {
    key: "1",
    label: "Billing Profiles",
    children: <Billing />,
  },
  {
    key: "2",
    label: "Customer Profiles",
    children: <Customer />,
  },
];

const Profiles = () => {
  useHandleSession(location.pathname);
  return (
    <div>
      <title>Profiles | Payper</title>

      <div className="">
        <h3 className="text-2xl font-bold"> Profiles</h3>
      </div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Profiles;
