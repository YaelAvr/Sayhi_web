import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { createDesplayName } from "./serverCallFunctions/serverCallFunctions";
// import "./LoginPage.css";
import UserForm from "../userForm/UserForm";
import registerText from "./registerText.json";

import CreateUserName from "./createUserName.jsx/CreateUserName";
import CreatePic from "./createPic/CreatePic";
import CreatePassword from "./createPassword/CreatePassword";
import CreateDisplayName from "./createDisplayName/CreateDisplayName";
import CreateGenderAndBirthday from "./createGenderAndBirthday/CreateGenderAndBirthday";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    displayName: "",
    birthDay: "",
    gender: "",
    userName: "",
    password: "",
    picture: "",
  });

  const changeUserData = (fild, data) => {
    setUserData((prev) => ({ ...prev, [fild]: data }));
  };

  useEffect(() => {
    console.log("final data:", userData);
  }, [userData]);

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState({
  //   password: "",
  //   confirm: "",
  // });

  // const [picture, setPicture] = useState({
  //   img: null,
  //   url: null
  // })

  // const [firstWord, setFirstWord] = useState("");
  // const [secondWord, setSecondWord] = useState("");

  // const [birthDay, setBirthDay] = useState({
  //   day: "",
  //   month: "",
  //   year: ""
  // });
  // const [gender, setGender] = useState("");

  const [errorText, setError] = useState(null);

  // const [bDayInputClass, setBDayIInputClass] = useState("no-input");
  // const [gInputClass, setGInputClass] = useState("no-input");
  // const [inputClass, setInputClass] = useState("no-input");
  // const [part, setPart] = useState(3); //כלי עזר לזמן עבודה
  const [part, setPart] = useState(0); //להחזיר

  const navigate = useNavigate();

  /*
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
*/

  // create a display name for the user using the Web server
  // const createUserName = async (e) => {
  //   e.preventDefault();

  //   const res = await fetch("/api/users/userName", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ username }),
  //   });

  //   if (res.status === 200) {
  //     // insert the returned name
  //     const data = await res.json();
  //     // setDisplayName(data.displayName);
  //     setUserData((prev) => ({ ...prev, userName: data.username }));
  //     handleNext();
  //   } else if (res.status === 400 || res.status === 404) {
  //     setInputClass("bad-input");
  //     const errorData = await res.json();
  //     setError(errorData.error);
  //   } else {
  //     alert("An error occurred, please try again later");
  //   }
  // };

  // const createPassWord = async (e) => {
  //   e.preventDefault();

  //   const res = await fetch("/api/users/password", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ ...password }),
  //   });

  //   if (res.status === 200) {
  //     const data = await res.json();
  //     setUserData((prev) => ({ ...prev, password: data.password }));
  //     handleNext();
  //   } else if (res.status === 400 || res.status === 404) {
  //     setInputClass("bad-input");
  //     const errorData = await res.json();
  //     setError(errorData.error);
  //   } else {
  //     alert("An error occurred, please try again later");
  //   }
  // };

  //  /* this function insert the inserted values to the fitting
  //  birtday start filed*/
  // const handleBdayChange = (e) => {
  //   let val = e.target.value;

  //   if (!(e.target.name === "month")) {
  //     // prevent the uder from entering non digits values
  //     val = e.target.value.replace(/\D/g, "");
  //   }
  //   setBirthDay((prev) => ({ ...prev, [e.target.name]: val }));
  // };

  const handleBack = () => {
    setPart((perv) => perv - 1);

    // setError(null);
  };

  const handleNext = () => {
    setPart((prev) => prev + 1);
    // setError(null);
  };

  // const getPartText = () => {
  //   const data = registerText[part];
  //   if (!data) return null;
  //   return data;
  // };

  const formConfigs = {
    // 0: {
    //   buttonsConf: {
    //     SubmitFunc: createDisplayName,
    //   },
    //   inputsConf: [
    //     {
    //       inputClass: !errorText ? "no-input" : "bad-input",
    //       inputValue: firstWord,
    //       setVal: (e) => setFirstWord(e.target.value),
    //     },
    //     {
    //       inputValue: secondWord,
    //       setVal: (e) => setSecondWord(e.target.value),
    //     },
    //   ],
    //   errorText: errorText,
    // },
    // 1: {
    //   errorText: errorText,
    //   buttonsConf: { ClickFunc: handleBack, SubmitFunc: handleGenderAgeSub },
    //   bDayConf: [
    //     {
    //       inputClass: bDayInputClass,
    //       inputValue: birthDay.day,
    //       name: "day",
    //       setVal: handleBdayChange,
    //     },
    //     {
    //       inputClass: bDayInputClass,
    //       inputValue: birthDay.month,
    //       name: "month",
    //       setVal: handleBdayChange,
    //     },
    //     {
    //       inputClass: bDayInputClass,
    //       inputValue: birthDay.year,
    //       name: "year",
    //       setVal: handleBdayChange,
    //     },
    //   ],
    //   selectConf: {
    //     inputClass: gInputClass,
    //     inputValue: gender,
    //     setVal: (e) => setGender(e.target.value),
    //   },
    // },
    // 2: {
    //   errorText: errorText,
    //   buttonsConf: { ClickFunc: handleBack, SubmitFunc: createUserName },
    //   inputsConf: [
    //     {
    //       inputClass: !errorText ? "no-input" : "bad-input",
    //       inputValue: username,
    //       setVal: (e) => setUsername(e.target.value),
    //     },
    //   ],
    // },
    // // 3: {
    //   buttonsConf: { ClickFunc: handleBack, SubmitFunc: createPassWord },
    //   inputsConf: [
    //     {
    //       inputClass: !errorText ? "no-input" : "bad-input",
    //       inputValue: password.password,
    //       setVal: handlePasswordChange,
    //     },
    //     {
    //       inputClass: !errorText ? "no-input" : "bad-input",
    //       inputValue: password.confirm,
    //       setVal: handlePasswordChange,
    //     }
    //   ],
    //   errorText: errorText,
    // },
  };

  const registerUser = async (e) => {
    navigate("/login");
  };

  const displayPage = () => {
    // const partText = getPartText();
    const config = {
      buttonsConf: {
        ClickFunc: () => {
          setPart(0);
          setUserData({
            displayName: "",
            birthDay: "",
            gender: "",
            userName: "",
            password: "",
            picture: "",
          });
        },
        SubmitFunc: registerUser,
      },
      userData: userData,
    };
    // if (!config) return null;

    console.log("part: " + part);

    // switch (part) {
    //   case 0: {

    //   }
    //   case 1: {}
    //   case 2: {}
    //   case 3: {
    //   return <CreatePassword userData={userData.password} setUserData={changeUserData} text={partText} handleBack={handleBack} handleNext={handleNext} />

    //   }
    //     case 4: {
    //   return <CreatePic userData={userData.pic} setUserData={changeUserData} partText={partText} handleBack={handleBack} handleNext={handleNext} />

    //     }
    //     default:
    //     break;
    //   }

    if (part === 0) {
      return (
        <CreateDisplayName
          userData={userData.displayName}
          setUserData={changeUserData}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      );
    } else if (part === 1) {
      return (
        <CreateGenderAndBirthday
          userData={userData.displayName}
          setUserData={changeUserData}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      );
    } else if (part === 2) {
      return (
        <CreateUserName
          userData={userData.userName}
          setUserData={changeUserData}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      );
    } else if (part === 3) {
      return (
        <CreatePassword
          userData={userData.password}
          setUserData={changeUserData}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      );
    } else if (part === 4) {
      return (
        <CreatePic
          userData={userData.pic}
          setUserData={changeUserData}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      );
    } else if (part === 5) {
      return <UserForm {...config} data={registerText["confirm"]} />;
    }
  };

  return displayPage();
};
export default RegisterPage;
