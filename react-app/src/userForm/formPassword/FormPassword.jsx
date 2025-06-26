import { useState, useRef, memo } from "react";
import FormInputs from "../formInputs/FormInputs";

const FormPassword = ({ inputsConf, inputs, showPass, handleKeyUp }) => {
    const [showPassword, setShowPassword] = useState(false)
  return (
    <>
      {inputs.map((input, index) => (
        <FormInputs
          name={input.id}
          key={index}
          {...inputsConf[index]}
          inputs={input}
          handleKeyUp={handleKeyUp}
          inputType={showPassword?"text":"password"}
        />
      ))}

      <label className="toggle-password">
        <input
          type={showPass.type}
          name={showPass.name}
          onChange={(e) => setShowPassword(e.target.checked)}
        />
        {showPass.label}
      </label>
    </>
  );
};

export default memo(FormPassword);
