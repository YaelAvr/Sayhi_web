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
  const [errorText, setError] = useState(null);

  const [inputClass, setInputClass] = useState("no-input");
  const [part, setPart] = useState(0);
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
        setPart(1);
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
  const createName = ({ firstName, lastname = null }) => {
    if (!firstName) {
      setInputClass("bad-input");
      setError("Enter first name");
    }
    else{
        setDisplayName(`${firstName} ${lastname&&lastname}`);
        setPart(part++);
        setInputClass("no-input");
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
        { inputClass: inputClass, inputValue: username, setVal: setUsername },
      ],
    },
    1: {
      buttonsConf: { ClickFunc: handleBack, SubmitFunc: handleLogin },
      inputsConf: [
        { inputClass: inputClass, inputValue: password, setVal: setPassword },
      ],
      displayName: displayName,
      username: username,
    },
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
