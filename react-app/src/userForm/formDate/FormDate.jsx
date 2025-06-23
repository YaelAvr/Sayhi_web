import FormInputs from "../formInputs/FormInputs";
import FormSelect from "../formSelect/FormSelect";
import "./FormDate.css";
const FormDate = ({ bDayConf, data, handleKeyUp }) => {

  return (
    <div id="date-div" className="form-flex-row">
      <FormInputs {...bDayConf[0]} inputs={data[0]} handleKeyUp={handleKeyUp} />
      <FormSelect {...bDayConf[1]} data={data[1]} />
      <FormInputs {...bDayConf[2]} inputs={data[2]} handleKeyUp={handleKeyUp} />
    </div>
  );
};

export default FormDate;
