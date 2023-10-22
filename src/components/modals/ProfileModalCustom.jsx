import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "antd";
import { useMutation } from "@tanstack/react-query";
import appServices from "../../services/app/appServices";
import { toast } from "react-hot-toast";

const ProfileModal = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(4, "Profile name must be at least 4 characters")
      .required("Profile name is required"),
    details: yup
      .string()
      .min(10, "Details must be at least 10 characters")
      .max(255, "max detail must be 255 characters")
      .required("Details address is required"),
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation(
    (payload) => appServices.createCustomer(payload),
    {
      onSettled: () => {
        setConfirmLoading(false);
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
      onSuccess: (response) => {
        if (response.status === 200) {
          toast.success("Profile created");
          props.close(false);
          props.add({ ...getValues(), _id: response.data._id });
        } else {
          toast.error("something went wrong. Please wait awhile and try again");
        }
      },
    }
  );

  const handleClick = () => {
    console.log(getValues());
    setConfirmLoading(true);
    mutate(getValues());
  };

  return (
    <Modal
      title="Create a new customer profile"
      centered
      open={true}
      okText="save"
      onOk={() => handleClick()}
      confirmLoading={confirmLoading}
      onCancel={() => {
        props.close(false);
      }}
    >
      <form
        id="xxx"
        className="my-10"
        onSubmit={handleSubmit((payload) => mutate(payload))}
      >
        <div className="form-group ">
          <label>Profile Name</label>
          <input
            {...register("name", { minLength: 4, maxLength: 100 })}
            placeholder="ex: my company name"
          />
          {<h2 className="error-message">{errors?.fullname?.name}</h2>}
        </div>
        <div className="form-group ">
          <label>Profile Email</label>
          <input {...register("email")} placeholder="ex: email@my-company.co" />
          {<h2 className="error-message">{errors?.email?.name}</h2>}
        </div>
        <div className="form-group ">
          <label>Profile Phone</label>
          <input {...register("phone")} placeholder="ex: +1234567890" />
          {<h2 className="error-message">{errors?.fullname?.name}</h2>}
        </div>

        <div className="form-group ">
          <label>Profile Address</label>
          <input
            {...register("address")}
            placeholder="ex: 123 Block a company street"
          />
          {<h2 className="error-message">{errors?.address?.name}</h2>}
        </div>
        {/* <div className="form-group ">
          <label>Profile Logo</label>
          <input
            {...register("fullname")}
            placeholder="Profile name"
            type="file"
          />
        </div> */}
        <button type="submit" id="fmbtn" className="hidden"></button>
      </form>
    </Modal>
  );
};

export default ProfileModal;
