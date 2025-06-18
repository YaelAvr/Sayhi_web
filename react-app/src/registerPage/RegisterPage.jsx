import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createName } from "./createDisplayName/createDisplayName";
// import "./LoginPage.css";
import UserForm from "../userForm/UserForm";
import registerText from "./registerText.json";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [displayName, setDisplayName] = useState("");
  const [firstWord, setFirstWord] = useState("");
  const [secondWord, setSecondWord] = useState("");

  const [errorText, setError] = useState(null);

  const [inputClass, setInputClass] = useState("no-input");
  const [part, setPart] = useState(0);
  const navigate = useNavigate();

  const createName =  async (e) => {
    e.preventDefault();
    // displayName
    // if (!firstWord) {
    //   setInputClass("bad-input");
    //   setError("Enter first name");
    // } else {
    //   setDisplayName(`${firstWord} ${secondWord}`);
    //   setPart((prev) => prev + 1);
    //   setInputClass("no-input");
    //   setError(null);
    // }
    const res = await fetch("/api/users/displayName", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( `${firstWord} ${secondWord}`),
    });

    if (res.status === 200) {
      const data= res.json();
    setDisplayName(data.displayName);

      setPart((prev) => prev + 1);
      setInputClass("no-input");
      setError(null);
    } else if (res.status === 400 || res.status === 404) {
      setInputClass("bad-input");
      const errorData = await res.json();
      setError(errorData.error);
    } else {
      alert("An error occurred, please try again later");
    }

  };

  const handleBack = () => {
    setPart(0);
    setInputClass("no-input");
  };

  const getPartText = () => {
    const data = registerText[part];
    if (!data) return null;
    return data;
  };

  const formConfigs = {
    0: {
      buttonsConf: {
        // ClickFunc: () => navigate("/RegisterPage"),
        SubmitFunc: createName,
      },
      inputsConf: [
        { inputClass: inputClass, inputValue: firstWord, setVal: setFirstWord },
        { inputValue: secondWord, setVal: setSecondWord },
      ],
    },
    // 1: {
    //   buttonsConf: { ClickFunc: handleBack, SubmitFunc: handleLogin },
    //   inputsConf: [
    //     { inputClass: inputClass, inputValue: password, setVal: setPassword },

    //   ],
    //   displayName: displayName,
    //   username: username,
    // },
  };

  const displayPage = () => {
    const partText = getPartText();
    const config = formConfigs[part];
    if (!config) return null;
    return <UserForm {...config} data={partText} />;
  };

  return displayPage();
};
export default RegisterPage;
