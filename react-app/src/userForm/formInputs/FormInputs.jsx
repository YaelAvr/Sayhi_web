import "../UserForm.css";
const FormInputs = ({
  inputValue,
  setVal,
  inputClass,
  inputs,
  handleKeyUp
}) => {
  //   inputsConf: [{  inputClass: inputClass, inputValue: username, setVal: setUsername }],
  //"inputs": [
  //   {
  //     "key": "0",
  //     "id": "login-username",
  //     "type": "text",
  //     "placeHolder": "Email"
  //   }

  const handleChange = (e) => {
    // תומך גם ב-setVal(e) וגם ב-setVal(value)
    if (typeof setVal === "function") {
      if (setVal.length === 1) {
        // אם הפונקציה מקבלת רק פרמטר אחד – נניח שזה value
        setVal(e.target.value);
      } else {
        // אחרת – נניח שזו פונקציה שמצפה ל־e שלם
        setVal(e);
      }
    }
  };
  return (
    <input
      className={inputClass}
      id={inputs.id}
      type={inputs.type}
      name={inputs.name}
      autoComplete="off"
      value={inputValue}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
      placeholder={inputs.placeHolder}
      min={inputs.min && inputs.min}
      max={inputs.max&&inputs.max}
    />
  );
};

export default FormInputs;
