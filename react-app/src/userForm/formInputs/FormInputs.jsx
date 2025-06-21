import "../UserForm.css";
import "./FormInputs.css";

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
// console.log(setVal.length)
//   const handleChange = (e) => {
//     // תומך גם ב-setVal(e) וגם ב-setVal(value)
//     if (typeof setVal === "function") {
      
//       if (setVal.length === 1) {
//         // אם הפונקציה מקבלת רק פרמטר אחד – נניח שזה value
//         setVal(e.target.value);
//       } else {
//         // אחרת – נניח שזו פונקציה שמצפה ל־e שלם
//         setVal(e);
//       }
//     }
//   };
  return (
    <input
      className={`${inputClass} form-input ${inputs.className && inputs.className}`}
      id={inputs.id}
      type={inputs.type}
      name={inputs.name}
      autoComplete="off"
      value={inputValue}
      // onChange={handleChange}
      onChange={(e)=>setVal(e)}
      onKeyUp={handleKeyUp}
      placeholder={inputs.placeHolder}
      min={inputs.min && inputs.min}
      max={inputs.max&&inputs.max}
    />
  );
};

export default FormInputs;
