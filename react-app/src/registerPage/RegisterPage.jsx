import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { createDesplayName } from "./serverCallFunctions/serverCallFunctions";
// import "./LoginPage.css";
import UserForm from "../userForm/UserForm";
import registerText from "./registerText.json";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    displayName: "",
    birthDay: "",
    gender: "",
    userName: "",
    password: "",
    pic: "",
  });

  useEffect(() => {
    console.log("final data:", userData);
  }, [userData]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState({
    password: "",
    confirm: "",
  });

  // const [displayName, setDisplayName] = useState("");
  const [firstWord, setFirstWord] = useState("");
  const [secondWord, setSecondWord] = useState("");

  const [birthDay, setBirthDay] = useState({
    day: "",
    month: "",
    year: "",
    // date: "",
  });
  const [gender, setGender] = useState("");

  const [errorText, setError] = useState(null);

  const [bDayInputClass, setBDayIInputClass] = useState("no-input");
  const [gInputClass, setGInputClass] = useState("no-input");

  const [inputClass, setInputClass] = useState("no-input");
  const [part, setPart] = useState(1); //כלי עזר לזמן עבודה
  // const [part, setPart] = useState(0); //להחזיר

  const navigate = useNavigate();

  // create a display name for the user using the Web server
  const createDisplayName = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/users/displayName", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstWord, secondWord }),
    });

    if (res.status === 200) {
      // insert the returned name
      const data = await res.json();
      // setDisplayName(data.displayName);
      setUserData((prev) => ({ ...prev, displayName: data.displayName }));
      console.log(userData.displayName);

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
    const numM =
      registerText[part].birthDay[1].options.indexOf(birthDay.month) + 1;

    const res = await fetch("/api/users/birthday", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        day: birthDay.day,
        month: numM,
        year: birthDay.year,
      }),
    });

    if (res.status === 200) {
      const data = await res.json();

      console.log("bday: " + data.birthday);
      setUserData((prev) => ({ ...prev, birthDay: data.birthday }));

      // setBirthDay((prev) => ({ ...prev, date: data.birthday }));
      return 200;
    } else if (res.status === 400 || res.status === 404) {
      const errorData = await res.json();
      setError(errorData.error);
      setBDayIInputClass("bad-input");
      return res.status;
    }
    alert("An error occurred, please try again later");
    return "other fail";
  };

  const createGender = async () => {
    // console.log("gender: " + gender);
    const res = await fetch("/api/users/gender", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gender }),
    });
    if (res.status === 200) {
      const data = await res.json();
      // setGender(data.gender);
      setUserData((prev) => ({ ...prev, gender: data.gender }));

      return 200;
    } else if (res.status === 400 || res.status === 404) {
      const errorData = await res.json();
      setError(errorData.error);
      setGInputClass("bad-input");
      return res.status;
    }
    alert("An error occurred, please try again later");
    return "other fail";
  };

  const handleGenderAgeSub = async (e) => {
    e.preventDefault();
    const bdRes = await createBirthDay();

    if (bdRes === 200) {
      //if the date was valid, continu to check gender
      const genderRes = await createGender();

      if (genderRes === 200) {
        // console.log("birthday: " + birthDay.date + " gender " + gender);
        handleNext();
      }
    }
  };

  // create a display name for the user using the Web server
  const createUserName = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/users/userName", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    if (res.status === 200) {
      // insert the returned name
      const data = await res.json();
      // setDisplayName(data.displayName);
      setUserData((prev) => ({ ...prev, userName: data.username }));
      handleNext();
    } else if (res.status === 400 || res.status === 404) {
      setInputClass("bad-input");
      const errorData = await res.json();
      setError(errorData.error);
    } else {
      alert("An error occurred, please try again later");
    }
  };
   // create a display name for the user using the Web server
  const createPassWord = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/users/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...password }),
    });

    if (res.status === 200) {
      // insert the returned name
      const data = await res.json();
      // setDisplayName(data.displayName);
      setUserData((prev) => ({ ...prev, password: data.password }));
      handleNext();
    } else if (res.status === 400 || res.status === 404) {
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
    setBDayIInputClass("no-input");
    setGInputClass("no-input");
    setError(null);
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

  /* this function insert the inserted values to the fitting
   birtday start filed*/
  const handleBdayChange = (e) => {
    let val = e.target.value;

    if (!(e.target.name === "month")) {
      // prevent the uder from entering non digits values
      val = e.target.value.replace(/\D/g, "");
    }
    setBirthDay((prev) => ({ ...prev, [e.target.name]: val }));
  };

  const handlePasswordChange = (e) => {
    setPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formConfigs = {
    0: {
      buttonsConf: {
        SubmitFunc: createDisplayName,
      },
      inputsConf: [
        {
          inputClass: inputClass,
          inputValue: firstWord,
          setVal: (e) => setFirstWord(e.target.value),
        },
        {
          inputValue: secondWord,
          setVal: (e) => setSecondWord(e.target.value),
        },
      ],
      errorText: errorText,
    },
    1: {
      errorText: errorText,
      buttonsConf: { ClickFunc: handleBack, SubmitFunc: handleGenderAgeSub },
      bDayConf: [
        {
          inputClass: bDayInputClass,
          inputValue: birthDay.day,
          name: "day",
          setVal: handleBdayChange,
        },
        {
          inputClass: bDayInputClass,
          inputValue: birthDay.month,
          name: "month",
          setVal: handleBdayChange,
        },
        {
          inputClass: bDayInputClass,
          inputValue: birthDay.year,
          name: "year",
          setVal: handleBdayChange,
        },
      ],

      selectConf: {
        inputClass: gInputClass,
        inputValue: gender,
        setVal: (e) => setGender(e.target.value),
      },
    },
    2: {
      errorText: errorText,
      buttonsConf: { ClickFunc: handleBack, SubmitFunc: createUserName },
      inputsConf: [
        {
          inputClass: inputClass,
          inputValue: username,
          setVal: (e) => setUsername(e.target.value),
        },
      ],
    },
    3: {
      buttonsConf: { ClickFunc: handleBack, SubmitFunc: createPassWord },
      inputsConf: [
        {
          inputClass: inputClass,
          inputValue: password,
          setVal: handlePasswordChange,
        },
        {
          inputClass: inputClass,
          inputValue: password,
          setVal: handlePasswordChange,
        },
      ],
      errorText: errorText,
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
