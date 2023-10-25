import { Select } from "antd";

const SelectUi = (props) => {
  const onChange = (value) => {
    props?.action(props.name, value);
  };

  const onSearch = (value) => {
    return;
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <Select
      className="block w-[100%]"
      showSearch
      placeholder={props?.placeholder}
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      options={props.options}
    />
  );
};

export default SelectUi;
