import React, { useState } from "react";
import UserForm from "../../userForm/UserForm";
import Text from "./text.json";

const CreatePassword = (props) => {
  const [password, setPassword] = useState({
    password: "",
    confirm: "",
  });
  const [errorText, setError] = useState(null);

  // Function to handle the password change input.
  // It updates the password state with the new value.
  const handlePasswordChange = (e) => {
    setPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to validate the password that the user entered.
  const validatePassword = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/users/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...password }),
    });

    const data = await res.json();
    if (res.ok) {
      setPassword({ password: "", confirm: "" });
      setError(null);
      // Update the user data with the new password
      props.setUserData("password", data.password);
      props.handleNext();
    } else {
      setError(data.error);
    }
  };

  const config = {
    buttonsConf: { ClickFunc: props.handleBack, SubmitFunc: validatePassword },
    inputsConf: [
      {
        inputClass: !errorText ? "no-input" : "bad-input",
        inputValue: password.password,
        setVal: handlePasswordChange,
      },
      {
        inputClass: !errorText ? "no-input" : "bad-input",
        inputValue: password.confirm,
        setVal: handlePasswordChange,
      },
    ],
    errorText: errorText,
  };
  
  return <UserForm {...config} data={Text} />;
};

export default CreatePassword;
