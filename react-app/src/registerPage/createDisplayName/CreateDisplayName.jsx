import React, { useState } from "react";
import  {API_STATUS_URL} from "../../config"
import UserForm from "../../userForm/UserForm";
import Text from "./text.json"

const CreateDisplayName = (props) => {
  const [firstWord, setFirstWord] = useState("");
  const [secondWord, setSecondWord] = useState("");
  const [errorText, setError] = useState(null);

  // Function to validate the display name that the user entered.
  const validateDisplayName = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_STATUS_URL}/users/displayName`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstWord, secondWord }),
    });

    const data = await res.json();
    if (res.ok) {
      setFirstWord("");
      setSecondWord("");
      setError(null);
      // Update the user data with the new display name
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
