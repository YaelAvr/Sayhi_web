import React from "react";
// import UserForm from "../userForm/UserForm";
import { useState, useRef, memo } from "react";

function UserForm({
  SubmitFunc,
  ClickFunc,
  // btnText,
  inputValue,
  // inputId,
  // placeHolder,
  setVal,
  inputClass,
  inputs
  // errorText
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
        // ref={inputValue}
        onKeyUp={handleKeyUp}
        placeholder={inputs.placeHolder}
      />
      {(inputClass === "bad-input") ? <div className="invalid-txt"><p>{inputs.errorText}</p><br/></div>:null}
      <div className="form-btns">
        <button type="button" onClick={ClickFunc}>
          {inputs.btnText}
        </button>
        <button type="submit">
          next
        </button>
      </div>
    </form>
  );
}

export default memo(UserForm);
