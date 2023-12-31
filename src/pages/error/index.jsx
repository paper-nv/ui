import { Button, Result } from "antd";
import PaperLogo from "../../assets/logo/Paper";

const Error = () => {
  return (
    <div className="">
      <div className="p-10 flex gap-4  justify-center top-0 z-0 absolute w-[100%]">
        <PaperLogo height={700} className="opacity-5 text-blue-600" />
      </div>
      <div className="text-center mt-[10vh] flex justify-center align-middle">
        <Result
          status="500"
          title="OOOPS!!"
          subTitle="Sorry, something went wrong."
          extra={
            <Button
              onClick={() => {
                location.assign(location.origin);
              }}
              type="primary"
            >
              Back Home
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default Error;
