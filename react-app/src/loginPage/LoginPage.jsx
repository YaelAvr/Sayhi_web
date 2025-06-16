import React, { useState} from "react";
// import "./LoginPage.css";
import UserForm from "../userForm/UserForm";
import loginText from "./loginText.json";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputClass, setInputClass] = useState("no-input");
  const [displayName, setDisplayName] = useState("");
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
      alert("Login successful"); // לשנות למעבר עמוד לאינבוקס
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
      } else if (res.status === 404) {
        // alert("Username not found,\n please try again or register");
        setInputClass("bad-input");
      } else {
        alert("An error occurred, please try again later");
        // setInputClass("bad-input");
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

    return {
      title: data.title,
      text: data.text,
      input: {
        id: data.inputs.id,
        placeHolder: data.inputs.placeHolder,
        errorText: data.inputs.errorText,
        btnText: data.inputs.btnText,
      },
    };
  };
  const partText = getPartText();

  const displayPage = ()=> {
    if(loginPart === 0) {
      return <UserForm
          SubmitFunc={handleUsernameSubmit}
          ClickFunc={() => alert("create a new account")}
          // inputId="username"
          inputValue={username}
          setVal={setUsername}
          inputClass={inputClass}
          data = {partText}
          // inputs={partText.input}
        />
    } else if (loginPart === 1) {
      return  <UserForm
          SubmitFunc={handleLogin}
          ClickFunc={handleBack}
          inputValue={password}
          setVal={setPassword}
          inputClass={inputClass}
          data = {partText}
          displayName={displayName}
          username={username}
          // inputs={partText.input}
        />
    }
  }


  return (
    displayPage()
    // <div className="login-page">
    //   <div className="login-text">
    //     <h1 id="login-h1">
    //       {partText.title} {displayName}
    //     </h1>
    //     <p>
    //       {!(partText.text)?username:partText.text}
    //     </p>
    //   </div>

    //   {loginPart === 0 ? (
        
    //   ) : (
        
    //   )}
    // </div>
  );
};
export default LoginPage;
