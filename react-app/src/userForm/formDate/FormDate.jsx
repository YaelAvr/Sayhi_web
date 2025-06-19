import FormInputs from "../formInputs/FormInputs";
import FormSelect from "../formSelect/FormSelect";
import './FormDate.css'
const FormDate = ({ bDayConf, data, handleKeyUp }) => {

  //   const g = partText.select;
  // {...inputsConf[index]}
  //
  // handleKeyUp={handleKeyUp}

  // הפעולה לר טובה לאינפוט!! לא יודע לזהות מי שה E
  // const handleChange = (value) => {
  //   const onlyNums = value.replace(/\D/g, "");
  //   bDayConf.setVal({ ...birthDay, [e.target.name]: onlyNums });
  //   // console.log(birthDay[e.target.name] + " target name: " + e.target.name);
  // };
  return (
    <div id="date-div"> 
      <FormInputs
        {...bDayConf[0]}
        inputs={data[0]}
        handleKeyUp={handleKeyUp}
        // setVal={handleChange}
        inputClass={`${bDayConf.inputClass} ${data.className}`}
      />
      <FormSelect
        {...bDayConf[1]}
        data={data[1]}
        // setVal={handleChange}
        inputClass={`${bDayConf.inputClass} ${data.className}`}
      />
      <FormInputs
        {...bDayConf[2]}
        inputs={data[2]}
        handleKeyUp={handleKeyUp}
        // setVal={handleChange}
        inputClass={`${bDayConf.inputClass} ${data.className}`}
      />
    </div>
  );
};

export default FormDate;
