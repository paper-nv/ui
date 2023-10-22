import { LoadingOutlined } from "@ant-design/icons";
import "./loader.css";

const PageLoader = () => {
  return (
    <div className="pageloader ">
      <div>
        <LoadingOutlined
          className="text-blue-600"
          style={{ fontSize: "40px", fontWeight: "bold" }}
        />
      </div>
    </div>
  );
};

export default PageLoader;
