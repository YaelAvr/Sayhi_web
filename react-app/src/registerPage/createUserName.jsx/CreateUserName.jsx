//CreateUserName

import React, { useState } from "react";
import UserForm from "../../userForm/UserForm";
import Text from "./text.json"


const CreateUserName = (props) => {
  const [username, setUsername] = useState("");

  const [errorText, setError] = useState(null);

  // create a display name for the user using the Web server
  const submitUserName = async (e) => {
    e.preventDefault();

   const res = await fetch("/api/users/userName", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();
    if (res.ok) {
      setUsername("");
      setError(null);
      props.setUserData("userName", data.username);
      props.handleNext();
    } else {
      setError(data.error);
    }
  };

  const config = {
     errorText: errorText,
      buttonsConf: { ClickFunc: handleBack, SubmitFunc: submitUserName },
      inputsConf: [
        {
          inputClass: !errorText ? "no-input" : "bad-input",
          inputValue: username,
          setVal: (e) => setUsername(e.target.value),
        },
      ],
    };
  return <UserForm {...config} data={Text} />;
};

export default CreateUserName;
