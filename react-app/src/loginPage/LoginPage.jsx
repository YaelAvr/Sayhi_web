import React from "react";
import "./LoginPage.css";
import UserForm from "../userForm/UserForm";
import { useState, useRef, memo } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputClass, setInputClass] = useState("no-input");

  // const options = { username, password };
  const [loginPart, setLoginPart] = useState(0);

  //   const navigate = useNavigate();

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
      generateToken(); // Call the function to log the token
      alert("Login successful"); // לשנות למעבר עמוד לאינבוקס
    } else if (res.status === 404) {
      setInputClass("bad-input");
      alert("Invalid password");
    } else {
      alert("An error occurred, please try again later");
    }
  };

  const generateToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Token:", token);
    } else {
      console.error("No token found in localStorage.");
    }
  };

  const handleUsernameSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`/api/users/${username}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 200) {
      setLoginPart(1);
      setInputClass("no-input");
      console.log("Login part " + loginPart);
    } else if (res.status === 404) {
      alert("Username not found,\n please try again or register");
      setInputClass("bad-input");
    } else {
      alert("An error occurred, please try again later");
      setInputClass("bad-input");
    }
  } catch (err) {
    console.error("Fetch failed:", err);
    alert("Network error: Could not reach server");
  }
};


  const handleBack = () => {
    setLoginPart(0);
    setInputClass("no-input");
  };

  return (
    <div className="login-page">
      <div className="login-text">
        <h1>Sign in</h1>
        <p>to continue to Gmail</p>
      </div>
      {loginPart === 0 ? (
        <UserForm
          SubmitFunc={handleUsernameSubmit}
          ClickFunc={() => alert("create a new account")}
          btnText="Create a new account"
          inputValue={username}
          inputId="username"
          placeHolder="Email"
          setVal={setUsername}
          inputClass={inputClass}
        />
      ) : (
        <UserForm
          SubmitFunc={handleLogin}
          ClickFunc={handleBack}
          btnText="Back"
          inputValue={password}
          inputId="password"
          placeHolder="Password"
          setVal={setPassword}
          inputClass={inputClass}
        />
      )}
    </div>
  );
};
export default LoginPage;
