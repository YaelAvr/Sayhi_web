import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./LoginPage.css";
import UserForm from "../userForm/UserForm";
import loginText from "./loginText.json";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputClass, setInputClass] = useState("no-input");
  const [displayName, setDisplayName] = useState("");
  const [loginPart, setLoginPart] = useState(0);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/tokens/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.status === 201) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/inbox");
    } else if (res.status === 404) {
      setInputClass("bad-input");
      alert("Invalid password");
    } else {
      alert("An error occurred, please try again later");
    }
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/users/validation/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        const data = await res.json();
        setDisplayName(data.displayName);
        setLoginPart(1);
        setInputClass("no-input");
      } else if (res.status === 404 || res.status === 400) {
        setInputClass("bad-input");
      } else {
        alert("An error occurred, please try again later");
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      alert("Network error: Could not reach server");
    }
  };

  const handleBack = () => {
    setLoginPart(0);
    setDisplayName("");
    setInputClass("no-input");
  };

  const getPartText = () => {
    const data = loginText[loginPart];
    if (!data) return null;
    return data;
  };

  const formConfigs = {
    0: {
      buttonsConf: [
        {
          ClickFunc: () => navigate("/RegisterPage"),
        },
        { SubmitFunc: handleUsernameSubmit}
      ],

      inputsConf: [
        { inputClass: inputClass, inputValue: username, setVal: setUsername },
      ],
    },
    1: {
      buttonsConf: [{ ClickFunc: handleBack },{ SubmitFunc: handleLogin,}],
      inputsConf: [
        { inputClass: inputClass, inputValue: password, setVal: setPassword },
      ],
      displayName: displayName,
      username: username,
    },
  };

  const displayPage = () => {
    const partText = getPartText();
    const config = formConfigs[loginPart];
    if (!config) return null;
    return <UserForm {...config} data={partText} />;
  };

  return displayPage();
};
export default LoginPage;
