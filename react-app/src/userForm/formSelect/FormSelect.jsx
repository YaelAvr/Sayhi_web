const FormSelect = ({ inputValue, setVal, inputClass, data }) => {
  return(<select
    // name={data.name}
    value={inputValue}
    id={data.id}
    onChange={(e) => setVal(e.target.value)}
    className={inputClass}
  >
    <option id="default-option" value="">{data.placeHolder}</option>
    {data.options.map((val, index) => (
      <option key={index} value={index + 1}>
        {val}
      </option>
    ))}
  </select>)
};

export default FormSelect;
