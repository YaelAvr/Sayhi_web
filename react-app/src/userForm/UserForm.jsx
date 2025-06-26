import React from "react";
import "./UserForm.css";
import { useState, useRef, memo } from "react";
import Logo from "../gmailLogo/Logo";
import FormInputs from "./formInputs/FormInputs";
import FormDate from "./formDate/FormDate";
import FormSelect from "./formSelect/FormSelect";
import InputWithIcon from "./inputWithIcon/InputWithIcon";
import FormPassword from "./formPassword/FormPassword";
import FormImage from "./formImage/FormImage";
import ConfirmSub from "./confirmSub/ConfirmSub";

function UserForm({
  buttonsConf,
  data,
  errorText,
  inputsConf = null,
  selectConf = null,
  bDayConf = null,
  userData = null,
  displayName = null,
  username = null,
}) {
  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      buttonsConf.SubmitFunc();
    }
  };
  return (
    <div id="user-form-page" className="app-content-back">
      <Logo containerClass="form-logo-container form-conteiner" />
      {/* Create the left side text.  */}
      <div id="user-form-container" className="form-conteiner">
        <div className="form-text-cont">
          <h1 className="form-text">
            {data.title} {displayName && displayName}
          </h1>
          {/* <p>{!username ? data.text : `${username}@sayhi.com`}</p> */}
          <p className="form-text">{`${!username ? "" : username}${
            data.text
          }`}</p>
        </div>

        {/* Create the form veriables */}
        <form id="user-form" onSubmit={buttonsConf.SubmitFunc}>
          <div id="input-div" className="fill-parent-width">
            {userData && <ConfirmSub userData={userData} data={data.fildes} />}
            {!data.showPass ? (
              data.inputs &&
              data.inputs.map((input, index) =>
                !input.explainText ? (
                  <FormInputs
                    name={input.id}
                    key={index}
                    {...inputsConf[index]}
                    inputs={input}
                    handleKeyUp={handleKeyUp}
                  />
                ) : (
                  <InputWithIcon
                    name={input.id}
                    key={index}
                    {...inputsConf[index]}
                    inputs={input}
                    handleKeyUp={handleKeyUp}
                  />
                )
              )
            ) : (
              <FormPassword
                inputsConf={inputsConf}
                inputs={data.inputs}
                showPass={data.showPass}
                handleKeyUp={handleKeyUp}
              />
            )}

            {data.birthDay && (
              <FormDate
                bDayConf={bDayConf}
                data={data.birthDay}
                handleKeyUp={handleKeyUp}
              />
            )}
            {data.select && <FormSelect {...selectConf} data={data.select} />}
            {data.image && (
              <FormImage
                src={inputsConf.src}
                inputClass={inputsConf.inputClass}
                fileName={inputsConf.fileName}
                setVal={inputsConf.setVal}
                data={data.image}
              />
            )}
            {errorText &&
              (data.birthDay ? (
                <div className="invalid-txt-div fill-parent-width">
                  {errorText.map((text, index) => (
                    <p key={index} className="invalid-txt fill-parent-width">
                      {text}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="invalid-txt fill-parent-width">{errorText}</p>
              ))}
          </div>

          <div className="form-btns-div fill-parent-width form-flex-row ">
            <button
              type="button"
              onClick={buttonsConf.ClickFunc}
              className={`form-btn btn-border-radius ${
                !buttonsConf.ClickFunc && "remove-btn"
              }`}
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
