import React from "react";
import "./UserForm.css";
import { useState, useRef, memo } from "react";
import Logo from "../gmailLogo/Logo";
import FormInputs from "./formInputs/FormInputs";

function UserForm({
  inputsConf,
  buttonsConf,
  data,
  displayName = null,
  username = null,
}) {
  const inputs = data.inputs;
  const errorText = data.errorText;
  const buttonsText = data.button;

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      buttonsConf[1].SubmitFunc();
    }
  };
  return (
    <div id="user-form-page">
      <div className="form-text">
        <Logo containerClass="form-logo-container" />
        <h1>{data.title} {displayName && displayName}</h1>
        <p>{!username ? data.text : `${username}@sayhi.com`}</p>
      </div>

      <form id="user-form" onSubmit={buttonsConf[1].SubmitFunc}>
        <div id="input-div">
          {inputs.map((input, index) => (
            <FormInputs
              name={input.id}
              key={index}
              {...inputsConf[index]}
              inputs={input}
              handleKeyUp={handleKeyUp}
            />
          ))}
        </div>
        {inputsConf.inputClass === "bad-input" ? (
          // <div className="invalid-txt">
          <p className="invalid-txt">{errorText.errorText[0]}</p>
        ) : // </div>
        null}
        <div className="form-btns-div">
          <button
            type="button"
            onClick={buttonsConf[0].ClickFunc}
            className="form-btn"
            id="changing-btn"
          >
            {buttonsText[0].btnText}
          </button>
          <button type="submit" className="form-btn" id="next-btn">
            {buttonsText[1].btnText}
          </button>
        </div>
      </form>
    </div>
  );
}

export default memo(UserForm);
