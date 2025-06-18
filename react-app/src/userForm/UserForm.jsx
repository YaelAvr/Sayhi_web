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
      <div className="form-text">
        <Logo containerClass="form-logo-container" />
        <h1>
          {data.title} {displayName && displayName}
        </h1>
        <p>{!username ? data.text : `${username}@sayhi.com`}</p>
      </div>

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
          {data.selectConf && <FormSelect {...selectConf} data={data.select} />}
        </div>
        {errorText && <p className="invalid-txt">{errorText}</p>}
        <div className="form-btns-div">
          <button
            type="button"
            onClick={buttonsConf.ClickFunc}
            className="form-btn"
            id="changing-btn"
          >
            {data.button.changeBtnText}
          </button>
          <button type="submit" className="form-btn" id="next-btn">
            {data.button.nextBtn}
          </button>
        </div>
      </form>
    </div>
  );
}

export default memo(UserForm);
