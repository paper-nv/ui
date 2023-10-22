import { ApiOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Error = () => {
  return (
    <div className="flex justify-center align-middle">
      <div className="text-center mt-[40vh]">
        <ApiOutlined className="text-6xl  text-blue-600" />
        <h3 className="text-2xl pt-2  font-bold">Link Broken!</h3>
        <p className="pt-2 pb-4">Oops! it seems you have lost your way</p>
        <Button type="primary" className="rounded-full" href="../">
          Go back home
        </Button>
      </div>
    </div>
  );
};

export default Error;
