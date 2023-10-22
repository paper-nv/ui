import { Modal } from "antd";

const xModal = (props) => {
  return (
    <Modal
      title="Vertically centered modal dialog"
      centered
      open={props.state}
      okText={props.ok}
      cancelText={props.cancel}
      //   onOk={() => props.toggle(false)}
      onCancel={() => props.toggle(false)}
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  );
};

export default xModal;
