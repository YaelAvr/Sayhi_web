import React from "react";
import "./UserForm.css";
import { useState, useRef, memo } from "react";
import Logo from "../gmailLogo/Logo";
import FormInputs from "./formInputs/FormInputs";
import FormDate from "./formDate/FormDate";
import FormSelect from "./formSelect/FormSelect";

function UserForm({
  buttonsConf,
  data,
  errorText,
  inputsConf = null,
  selectConf = null,
  bDayConf = null,
  displayName = null,
  username = null,
}) {
  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      buttonsConf.SubmitFunc();
    }
  };
  return (
    <div id="user-form-page">
      <Logo containerClass="form-logo-container form-conteiner" />
      {/* Create the left side text.  */}
      <div id="user-form-container" className="form-conteiner">
        <div className="form-text">
          <h1>
            {data.title} {displayName && displayName}
          </h1>
          <p>{!username ? data.text : `${username}@sayhi.com`}</p>
        </div>

        {/* Create the form veriables */}
        <form id="user-form" onSubmit={buttonsConf.SubmitFunc}>
          <div id="input-div">
            {data.inputs &&
              data.inputs.map((input, index) => (
                <FormInputs
                  name={input.id}
                  key={index}
                  {...inputsConf[index]}
                  inputs={input}
                  handleKeyUp={handleKeyUp}
                />
              ))}
            {data.birthDay && (
              <FormDate
                bDayConf={bDayConf}
                data={data.birthDay}
                handleKeyUp={handleKeyUp}
              />
            )}
            {data.select && <FormSelect {...selectConf} data={data.select} />}
          </div>
          {errorText && <p className="invalid-txt">{errorText}</p>}
          <div className="form-btns-div">
            <button
              type="button"
              onClick={buttonsConf.ClickFunc}
              className="form-btn btn-border-radius"
              id="changing-btn"
            >
              {data.button.changeBtnText}
            </button>
            <button
              type="submit"
              className="form-btn btn-border-radius"
              id="next-btn"
            >
              {data.button.nextBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default memo(UserForm);
