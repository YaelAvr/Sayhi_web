import React from "react";
import "./UserForm.css";
import { useState, useRef, memo } from "react";
import Logo from "../gmailLogo/Logo"
import FormInputs from "./formInputs/FormInputs";

function UserForm({
  // SubmitFunc,
  // ClickFunc,
  // inputValue,
  // setVal,
  // inputClass,
  inputsConf,
  buttonsConf,
  data,
  displayName = null,
  username = null
}) {

  const inputs = data.inputs
  const errorText = data.errorText
  const buttonsText = data.button

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      buttonsConf.SubmitFunc();
    }
  };
  return (
    <div id="user-form-page">
       <div className="form-text">
        <Logo containerClass="logo-container"/>
        <h1>
          {!(displayName)?data.title:displayName}
        </h1>
        <p>
          {!(username)?data.text:username}
        </p>
      </div>

      <form id="user-form" onSubmit={buttonsConf.SubmitFunc}>
        {inputs.map((input)=>(<FormInputs key={input.key} {...inputsConf[input.key]} {...input} handleKeyUp={handleKeyUp}/>))}
        {/* <input 
          className={inputClass}
          id={inputs.id}
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setVal(e.target.value)}
          onKeyUp={handleKeyUp}
          placeholder={inputs.placeHolder}
        /> */}
        {inputsConf.inputClass === "bad-input" ? (
          // <div className="invalid-txt">
            <p className="invalid-txt">{errorText.errorText[0]}</p>
          // </div>
        ) : null}
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
            next
          </button>
        </div>
      </form>
    </div>
  );
}

export default memo(UserForm);
