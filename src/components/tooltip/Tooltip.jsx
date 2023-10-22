import PropTypes from "prop-types";

const ToolTip = (props) => {
  return (
    <span className="absolute top-18 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
      {props.text}
    </span>
  );
};

ToolTip.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ToolTip;
