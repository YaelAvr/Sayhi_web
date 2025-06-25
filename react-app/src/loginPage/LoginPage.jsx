import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../userForm/UserForm";
import loginText from "./loginText.json";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errorText, setError] = useState(null);
  const [loginPart, setLoginPart] = useState(0);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/tokens/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setUsername("");
      navigate("/inbox");
    } else  {
      const errorData = await res.json();
      setError(errorData.error);
    } 
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/users/validation/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      
      if (res.ok) {
        const data = await res.json();
        setDisplayName(data.displayName);
        setError(null);
        setLoginPart(1);
      } else  {
        const errorData = await res.json();
        setError(errorData.error);
      } 
    } catch (err) {
      console.error("Fetch failed:", err);
      alert("Network error: Could not reach server");
    }
  };

  const handleBack = () => {
    setLoginPart(0);
    setDisplayName("");
    setPassword("");
    setError(null);
  };

  const getPartText = () => {
    const data = loginText[loginPart];
    if (!data) return null;
    return data;
  };

  const formConfigs = {
    0: {
      buttonsConf: {
        ClickFunc: () => navigate("/register"),
        SubmitFunc: handleUsernameSubmit,
      },

      inputsConf: [
        {
          inputClass:  !errorText ? "no-input" : "bad-input",
          inputValue: username,
          setVal: (e) => setUsername(e.target.value),
        },
      ],
      errorText: errorText,
    },
    1: {
      buttonsConf: { ClickFunc: handleBack, SubmitFunc: handleLogin },
      inputsConf: [
        {
          inputClass:  !errorText ? "no-input" : "bad-input",
          inputValue: password,
          setVal: (e) => setPassword(e.target.value),
        },
      ],
      displayName: displayName,
      username: username,
      errorText: errorText,
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
