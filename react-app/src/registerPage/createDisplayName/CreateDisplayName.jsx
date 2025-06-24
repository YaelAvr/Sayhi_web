import React, { useState } from "react";
import UserForm from "../../userForm/UserForm";
import Text from "./text.json"

const CreateDisplayName = (props) => {
  const [firstWord, setFirstWord] = useState("");
  const [secondWord, setSecondWord] = useState("");

  const [errorText, setError] = useState(null);

  const validateDisplayName = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/users/displayName", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstWord, secondWord }),
    });

    const data = await res.json();
    if (res.ok) {
      setFirstWord("");
      setSecondWord("");
      setError(null);
      props.setUserData("displayName", data.displayName);
      props.handleNext();
    } else {
      setError(data.error);
    }
  };

  const config = {
      buttonsConf: {
        SubmitFunc: validateDisplayName,
      },
      inputsConf: [
        {
          inputClass: !errorText ? "no-input" : "bad-input",
          inputValue: firstWord,
          setVal: (e) => setFirstWord(e.target.value),
        },
        {
          inputValue: secondWord,
          setVal: (e) => setSecondWord(e.target.value),
        },
      ],
      errorText: errorText,
    };
  return <UserForm {...config} data={Text} />;
};

export default CreateDisplayName;
