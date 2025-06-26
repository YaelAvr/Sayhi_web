import { useState, useRef, memo } from "react";

import { ReactComponent as Help } from "../icons/help.svg";
import FormInputs from "../formInputs/FormInputs";
import "./InputWithIcon.css";
import FormExplainWin from "../formExplainWin/FormExplainWin";

const InputWithIcon = ({
  inputValue,
  setVal,
  inputClass,
  inputs,
  handleKeyUp,
}) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="input-icon-cont form-flex-row">
      {/* <div id={inputs.waterMark && "input-wrapper"}> */}
      <div id="input-wrapper">

        <FormInputs
          inputValue={inputValue}
          setVal={setVal}
          inputClass={inputClass}
          inputs={inputs}
          handleKeyUp={handleKeyUp}
        />
        {inputs.waterMark && (
          <span className="input-waterMark">{inputs.waterMark}</span>
        )}
      </div>

      <Help className="help-logo" onMouseEnter={() => setShowHelp(true)} />
      {showHelp && (
        <FormExplainWin
          setShowHelp={setShowHelp}
          explainText={inputs.explainText}
        />
      )}
    </div>
  );
};

export default memo(InputWithIcon);
