import React from "react";
import "./UserForm.css";
import { useState, useRef, memo } from "react";
import Logo from "../gmailLogo/Logo";
import FormInputs from "./formInputs/FormInputs";

function UserForm({
  inputsConf,
  buttonsConf,
  data,
  errorText,
  displayName = null,
  username = null,
}) {
  const inputs = data.inputs;
  // const errorText = data.errorText;
  const buttonsText = data.button;

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      buttonsConf.SubmitFunc();
    }
  };
  return (
    <div id="user-form-page">
      <div className="form-text">
        <Logo containerClass="form-logo-container" />
        <h1>
          {data.title} {displayName && displayName}
        </h1>
        <p>{!username ? data.text : `${username}@sayhi.com`}</p>
      </div>

      <form id="user-form" onSubmit={buttonsConf.SubmitFunc}>
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
        {errorText && <p className="invalid-txt">{errorText}</p>}
        <div className="form-btns-div">
          <button
            type="button"
            onClick={buttonsConf.ClickFunc}
            className="form-btn"
            id="changing-btn"
          >
            {buttonsText.changeBtnText}
          </button>
          <button type="submit" className="form-btn" id="next-btn">
            {buttonsText.nextBtn}
          </button>
        </div>
      </form>
    </div>
  );
}

export default memo(UserForm);
