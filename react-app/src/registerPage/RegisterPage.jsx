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
    birthday: "",
    gender: "",
    username: "",
    password: "",
    picture: "",
  });

  const changeUserData = (fild, data) => {
    setUserData((prev) => ({ ...prev, [fild]: data }));
  };

  useEffect(() => {
    console.log("final data:", userData);
  }, [userData]);

  const [errorText, setError] = useState(null);

  // const [part, setPart] = useState(4); //כלי עזר לזמן עבודה
  const [part, setPart] = useState(0); //להחזיר

  const navigate = useNavigate();

  const handleBack = () => {
    setPart((perv) => perv - 1);

    // setError(null);
  };

  const handleNext = () => {
    setPart((prev) => prev + 1);
  };

  const initRegister = () => {
    setPart(0);
    setUserData({
      displayName: "",
      birthDay: "",
      gender: "",
      userName: "",
      password: "",
      picture: "",
      preview: "",
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userData }),
    });
    if (!res.ok) {
      const data = await res.json();

      setError(data.error);
      return;
    } else {
      navigate("/login");
    }
  };
  // const formConfigs = {  };
  const config = {
    buttonsConf: {
      ClickFunc: initRegister,
      SubmitFunc: registerUser,
    },
    userData: userData,
    errorText: errorText,
  };

  const displayPage = () => {
    // const partText = getPartText();

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
