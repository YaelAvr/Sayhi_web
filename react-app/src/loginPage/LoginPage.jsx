import React, { useState } from "react";
import  {API_STATUS_URL} from "../config"
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

  // Function to handle login- if the password match the username
  // then the user is logged in and redirected to the inbox page with a new token.
  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if username and password match
    const res = await fetch(`${API_STATUS_URL}/tokens/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      // create the token and save it in localStorage
      localStorage.setItem("token", data.token);
      setUsername("");
      // navigate to the inbox page
      navigate("/inbox");
    } else {
      const errorData = await res.json();
      setError(errorData.error);
    }
  };

  // Function to handle the username submit-
  // check if the username belongs to a registerd user
  const handleUsernameSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_STATUS_URL}/users/validation/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        setUsername(data.username);
        setDisplayName(data.displayName);
        setError(null);
        setLoginPart(1);
      } else {
        const errorData = await res.json();
        setError(errorData.error);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  // Function to handle the back button click
  // reset the login part to 0 and clear the username and password fields
  const handleBack = () => {
    setLoginPart(0);
    setDisplayName("");
    setUsername("");
    setPassword("");
    setError(null);
  };

  // Function to get the text for the current login part from the loginText.json file
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
          inputClass: !errorText ? "no-input" : "bad-input",
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
          inputClass: !errorText ? "no-input" : "bad-input",
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
