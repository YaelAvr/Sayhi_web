const FormSelect = ({ inputValue, setVal, inputClass, data }) => {
  <select
    name={data.name}
    value={inputValue.month}
    id={data.id}
    onChange={(e) => setVal(e.target.value)}
    className={inputClass}
  >
    <option value="">{data.placeHolder}</option>
    {data.options.map((val, index) => (
      <option key={index} value={index + 1}>
        {val}
      </option>
    ))}
  </select>;
};

export default FormSelect;
