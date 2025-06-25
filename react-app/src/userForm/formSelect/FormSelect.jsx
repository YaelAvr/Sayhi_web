import "./FormSelect.css";
const FormSelect = ({ inputValue, setVal, inputClass, data }) => {
  return (
    <select
      name={data.name}
      value={!inputValue ? data.placeHolder : inputValue}
      id={data.id}
      onChange={setVal}
      className={`${inputClass} form-select ${data.className} ${inputValue === "" && "default-option"}`}
    >
      <option value="">
        {data.placeHolder}
      </option>
      {data.options.map((val, index) => (
        <option key={index} value={val}>
          {val}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;
