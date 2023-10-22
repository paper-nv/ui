import { useState } from "react";
import { Modal, Typography } from "antd";
import { useMutation } from "@tanstack/react-query";
import appServices from "../../services/app/appServices";
import { toast } from "react-hot-toast";
import { QuestionCircleOutlined } from "@ant-design/icons";

const DeleteProfileModal = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { Title } = Typography;

  const { mutate } = useMutation(
    (payload) => appServices.deleteCustomer(payload),
    {
      onSettled: () => {
        setConfirmLoading(false);
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
      onSuccess: (response) => {
        if (response.status === 200) {
          toast.success("Profile deleted");
          props.close(false);
          props.del(props.profile._id);
        } else {
          toast.error("something went wrong. Please wait awhile and try again");
        }
      },
    }
  );

  const handleClick = () => {
    mutate(props.profile._id);
  };

  return (
    <Modal
      centered
      open={true}
      okText="Proceed"
      okButtonProps={{ danger: true }}
      onOk={() => handleClick()}
      confirmLoading={confirmLoading}
      onCancel={() => {
        props.close(false);
      }}
    >
      <div className="py-20 flex justify-center">
        <div className="text-center">
          <div className="pb-4 ">
            <QuestionCircleOutlined
              className="text-red-400"
              style={{ fontSize: "3rem" }}
            />
          </div>
          <Title level={4} className="text-lg">
            Delete Customer Profile
          </Title>
          <p>
            You are about to delete <b>{props.profile.name}</b> . this action is
            irreversible{" "}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteProfileModal;
