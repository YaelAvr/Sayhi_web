import React from "react";
import "./UserForm.css";
import { useState, useRef, memo } from "react";

function UserForm({
  SubmitFunc,
  ClickFunc,
  inputValue,
  setVal,
  inputClass,
  data,
  // inputs,
  // texts,
  displayName = null,
  username = null
}) {

  const inputs = data.input

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      SubmitFunc();
    }
  };
  return (
    <div id="user-form-page">
       <div className="form-text">
        <h1>
          {!(displayName)?data.title:displayName}
        </h1>
        <p>
          {!(username)?data.text:username}
        </p>
      </div>

      <form id="user-form" onSubmit={SubmitFunc}>
        <input
          className={inputClass}
          id={inputs.id}
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setVal(e.target.value)}
          onKeyUp={handleKeyUp}
          placeholder={inputs.placeHolder}
        />
        {inputClass === "bad-input" ? (
          <div className="invalid-txt">
            <p>{inputs.errorText}</p>
          </div>
        ) : null}
        <div className="form-btns-div">
          <button
            type="button"
            onClick={ClickFunc}
            className="form-btn"
            id="changing-btn"
          >
            {inputs.btnText}
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
