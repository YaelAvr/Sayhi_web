import "./FormInputs.css";

const FormInputs = ({
  inputValue,
  setVal,
  inputClass,
  inputs,
  handleKeyUp,
  inputType=null
}) => {
  return (
      <input
        className={`${inputClass} form-input ${inputs.className && inputs.className}`}
        id={inputs.id}
        type={!inputType ? inputs.type : inputType}
        name={inputs.name}
        autoComplete="off"
        value={inputValue}
        onChange={(e) => setVal(e)}
        onKeyUp={handleKeyUp}
        placeholder={inputs.placeHolder}
        min={inputs.min && inputs.min}
        max={inputs.max && inputs.max}
      />
  );
};

export default FormInputs;
