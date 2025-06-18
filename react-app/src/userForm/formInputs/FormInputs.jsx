import "../UserForm.css";
const FormInputs = ({
  inputValue,
  setVal,
  inputClass,
  inputs,
  handleKeyUp,
  // min=null,
  // max=null
}) => {
  //   inputsConf: [{  inputClass: inputClass, inputValue: username, setVal: setUsername }],
  //"inputs": [
  //   {
  //     "key": "0",
  //     "id": "login-username",
  //     "type": "text",
  //     "placeHolder": "Email"
  //   }
  return (
    <input
      className={inputClass}
      id={inputs.id}
      type={inputs.type}
      autoComplete="off"
      value={inputValue}
      onChange={(e) => setVal(e.target.value)}
      onKeyUp={handleKeyUp}
      placeholder={inputs.placeHolder}
      min={inputs.min && inputs.min}
      max={inputs.max&&inputs.max}
    />
  );
};

export default FormInputs;
