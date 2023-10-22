const MF = (value, currency) => {
  return (
    currency +
    " " +
    new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(value)
  );
};

const DF = (value) => {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(value)
  );
};

const converter = {
  MF,
  DF,
};

export default converter;
