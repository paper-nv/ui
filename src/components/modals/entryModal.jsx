import { useRef, useState } from "react";
import { Modal } from "antd";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import converter from "../../utils/converter";
const EntryModal = (props) => {
  const { MF } = converter;
  const [total, setTotal] = useState(0.0);

  const formRef = useRef();

  const schema = yup.object().shape({
    description: yup
      .string()
      .min(3, "description must be at least 3 characters")
      .max(255, "description must not exceed 255 characters")
      .required("description is required"),
    units: yup
      .number()
      .typeError("item unit must be a number")
      .min(1, "Item must have at least one unit")
      .required("item units is required"),
    unitPrice: yup
      .number()
      .typeError("unit price must be a number")
      .min(0)
      .required("item unit price is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  function closeForm() {
    props.close(false);
    reset();
    setTotal("0.00");
  }

  const addEntry = async (payload) => {
    const entry = [
      {
        key: Math.floor(Math.random() * 100),
        label: "Description",
        children: payload.description,
      },
      {
        key: Math.floor(Math.random() * 100),
        label: "Price & Units",
        children: `${payload.unitPrice} x ${payload.units}`,
      },
      {
        key: Math.floor(Math.random() * 100),
        label: "Total",
        children: total,
      },
    ];
    return props.add(entry);
  };

  const getTotal = (e) => {
    const regExDecimalOrNumberOnly = /^[+-]?\d*\.{0,1}\d+$/;
    if (!regExDecimalOrNumberOnly.test(e.target.value)) return;
    setTotal(getValues().unitPrice * getValues().units);
  };

  return (
    <Modal
      title={`entry #${props.no}`}
      centered
      open={true}
      okText="save"
      onOk={() => formRef.current.click()}
      onCancel={() => {
        closeForm();
      }}
    >
      <form onSubmit={handleSubmit((payload) => addEntry(payload))}>
        <div className="form-group mb-5">
          <label>Item description</label>
          <input
            {...register("description")}
            placeholder="item or service identifier"
          />
          {<h2 className="error-message">{errors?.description?.message}</h2>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group mb-5  col-span-1">
            <label>Unit Price</label>
            <div className="flex ibordr justify-center items-baseline pt-10 ">
              <span className="flex justify-center items-center px-3 ">
                {props.currency}
              </span>

              <input
                {...register("unitPrice", { onChange: (e) => getTotal(e) })}
                placeholder="0.00"
                className=""
              />
            </div>
            {<h2 className="error-message">{errors?.unitPrice?.message}</h2>}
          </div>
          <div className="form-group mb-5 col-span-1">
            <label>Units</label>
            <input
              onChange={() => getTotal()}
              {...register("units", { onChange: (e) => getTotal(e) })}
              placeholder="0"
            />
            {<h2 className="error-message">{errors?.units?.message}</h2>}
          </div>
        </div>
        <div className="flex justify-end mb-[40px]">
          <div>
            <small>Total</small>
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                display: "block",
                lineHeight: "1rem",
              }}
            >
              {MF(total, props.currency)}
            </h3>
          </div>
        </div>
        <button ref={formRef} className="hidden">
          submit
        </button>
      </form>
    </Modal>
  );
};

export default EntryModal;
