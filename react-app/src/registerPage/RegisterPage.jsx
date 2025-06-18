import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { createName } from "./createDisplayName/createDisplayName";
// import "./LoginPage.css";
import UserForm from "../userForm/UserForm";
import registerText from "./registerText.json";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [displayName, setDisplayName] = useState("");
  const [firstWord, setFirstWord] = useState("");
  const [secondWord, setSecondWord] = useState("");

  const [birthDay, setBirthDay] = useState({
    day: "",
    month: "",
    year: "",
    date: "",
  });
  const [gender, setGender] = useState(null);

  const [errorText, setError] = useState(null);
  const [inputClass, setInputClass] = useState("no-input");
  const [part, setPart] = useState(0);
  const navigate = useNavigate();

  const createName = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/users/displayName", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(`${firstWord} ${secondWord}`),
    });

    if (res.status === 200) {
      const data = res.json();
      setDisplayName(data.displayName);
      handleNext();
    } else if (res.status === 400 || res.status === 404) {
      setInputClass("bad-input");
      const errorData = await res.json();
      setError(errorData.error);
    } else {
      alert("An error occurred, please try again later");
    }
  };

  const createBirthDay = async () => {
    // e.preventDefault();
    const res = await fetch("/api/users/birthday", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        day: birthDay.day,
        month: birthDay.month,
        year: birthDay.year,
      }),
    });

    return res;
  };

  const createGender = async () => {
    // e.preventDefault();
    const res = await fetch("/api/users/gender", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gender),
    });
    return res;
  };

  const handleGenderAgeSub = async (e) => {
    e.preventDefault();
    const bdRes = createBirthDay();
    const genderRes = createGender();

    if (bdRes.status === 200 && genderRes.status === 200) {
      setBirthDay({ ...birthDay, date: data });

      console.log("birthday: "+birthDay.date+" gender "+gender)
      handleNext();
    } else if (
      genderRes.status === 400 ||
      bdRes.status === 400 ||
      genderRes.status === 404 ||
      bdRes.status === 404
    ) {
      setInputClass("bad-input");
      const errorData = await res.json();
      setError(errorData.error);
    } else {
      alert("An error occurred, please try again later");
    }
  };

  const handleBack = () => {
    setPart((perv) => perv - 1);
    setInputClass("no-input");
  };

  const handleNext = () => {
    setPart((prev) => prev + 1);
    setInputClass("no-input");
    setError(null);
  };

  const getPartText = () => {
    const data = registerText[part];
    if (!data) return null;
    return data;
  };


  const handleBdayChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setBirthDay({ ...birthDay, [e.target.name]: onlyNums });
    console.log(birthDay[e.target.name] + " target name: " + e.target.name);
  };

  const formConfigs = {
    0: {
      buttonsConf: {
        // ClickFunc: () => navigate("/RegisterPage"),
        SubmitFunc: createName,
      },
      inputsConf: [
        { inputClass: inputClass, inputValue: firstWord, setVal: setFirstWord },
        { inputValue: secondWord, setVal: setSecondWord },
      ],
    },
    1: {
      buttonsConf: { ClickFunc: handleBack, SubmitFunc: handleGenderAgeSub },
      bDayConf: {
        inputs: [
          { inputValue: birthDay.day },
          { inputValue: birthDay.month },
          { inputValue: birthDay.year },
        ],
        inputClass: inputClass,
        setVal: setBirthDay,
      },

      selectConf: {
        inputClass: inputClass,
        inputValue: gender,
        setVal: setGender,
      },

      // inputsConf: [
      // { inputClass: inputClass, inputValue: password, setVal: setPassword },
      // ],
      // displayName: displayName,
      // username: username,
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
