import "../UserForm.css";
const FormInputs = (props) => {
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
      className={props.inputClass}
      id={props.id}
      type={props.type}
      autoComplete="off"
      value={props.inputValue}
      onChange={(e) => props.setVal(e.target.value)}
      onKeyUp={props.handleKeyUp}
      placeholder={props.placeHolder}
    />
  );
};

export default FormInputs;
