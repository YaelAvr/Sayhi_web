import React from "react";
// import UserForm from "../userForm/UserForm";
import { useState, useRef, memo } from "react";

function UserForm({ SubmitFunc, clickFunc, btnText, inputValue, inputId, placeHolder, setVal, inputClass }) {
  return (
    <form onSubmit={SubmitFunc}>
      <div id="login-username">
        {/* <label htmlFor={inputId}>{type}:</label> */}
        <input
          className={inputClass}
          id= {inputId}
          value={inputValue}
          onChange={(e) => setVal(e.target.value)}
          placeholder= {placeHolder}

        />
        {/* <input className="input" type="text" id="username" name="username" required /> */}
      </div>
      {/*  <Link to="../registerPage/RegisterPage">Create a new account</Link> */}
      <button type="button" onClick={clickFunc}>{btnText}</button>
      <button type="submit">next</button>
    </form>
  );
}

export default memo(UserForm);
