import "../UserForm.css";
import "./FormInputs.css";

const FormInputs = ({
  inputValue,
  setVal,
  inputClass,
  inputs,
  handleKeyUp,
}) => {
  return (
    <div id= {inputs.waterMark &&"input-wrapper"}>
      <input
        className={`${inputClass} form-input ${inputs.className && inputs.className}`}
        id={inputs.id}
        type={inputs.type}
        name={inputs.name}
        autoComplete="off"
        value={inputValue}
        // onChange={handleChange}
        onChange={(e) => setVal(e)}
        onKeyUp={handleKeyUp}
        placeholder={inputs.placeHolder}
        min={inputs.min && inputs.min}
        max={inputs.max && inputs.max}
      />
      {inputs.waterMark &&
      <span className="input-waterMark">{inputs.waterMark}</span>}
    </div>
  );
};

export default FormInputs;
