import { useState } from "react";
import { Modal, Card } from "antd";

const SelectTemplateModal = (props) => {
  const { Meta } = Card;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selected, setSelected] = useState({
    id: 1,
    name: "Business Default",
    img: "../../../src/assets/img/demo.png",
  });

  const templates = [
    {
      id: 1,
      name: "Business Default",
      img: "../../../src/assets/img/demo.png",
    },
    {
      id: 2,
      name: "Business Styled",
      img: "../../../src/assets/img/demo2.png",
    },
  ];

  const handleClick = () => {
    setConfirmLoading(true);
    props.setSelected("template", selected.name);
    props.close(false);
    setConfirmLoading(false);
  };

  return (
    <Modal
      title="Select a template"
      width={1000}
      centered
      open={true}
      okText="Proceed"
      onOk={() => handleClick()}
      confirmLoading={confirmLoading}
      onCancel={() => {
        props.close(false);
      }}
    >
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4 grid-cols-2 my-10 ">
        {templates.map((item) => {
          return (
            <div
              key={item.id}
              className="col-span-1"
              onClick={() => {
                setSelected(item);
              }}
            >
              <Card
                className={`selectant ${
                  selected.id === item.id ? "active" : null
                }`}
                cover={<img alt={`${item.name} image`} src={item.img} />}
              >
                <Meta className="text-sm" title={item.name}>
                  {" "}
                </Meta>
              </Card>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default SelectTemplateModal;
