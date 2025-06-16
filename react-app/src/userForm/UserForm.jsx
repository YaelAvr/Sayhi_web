import React from "react";
import "./UserForm.css";
import { useState, useRef, memo } from "react";

function UserForm({
  SubmitFunc,
  ClickFunc,
  inputValue,
  setVal,
  inputClass,
  inputs
}) {

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      SubmitFunc();
    }
  };
  return (
    <form className="user-form" onSubmit={SubmitFunc}>
      <input
        className={inputClass}
        id={inputs.id}
        autoComplete="off"
        value={inputValue}
        onChange={(e) => setVal(e.target.value)}
        onKeyUp={handleKeyUp}
        placeholder={inputs.placeHolder}
      />
      {(inputClass === "bad-input") ? <div className="invalid-txt"><p>{inputs.errorText}</p></div>:null}
      <div className="form-btns-div">
        <button type="button" onClick={ClickFunc} className="form-btn" id="changing-btn">
          {inputs.btnText}
        </button>
        <button type="submit" className="form-btn" id="next-btn">
          next
        </button>
      </div>
    </form>
  );
}

export default memo(UserForm);
