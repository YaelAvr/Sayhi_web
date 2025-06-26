import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const [errorText, setError] = useState(null);
  const [part, setPart] = useState(0);
  const navigate = useNavigate();

  const handleBack = () => {
    setPart((perv) => perv - 1);
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
  const config = {
    buttonsConf: {
      ClickFunc: initRegister,
      SubmitFunc: registerUser,
    },
    userData: userData,
    errorText: errorText,
  };

  const functions = {
    setUserData: changeUserData,
    handleBack: handleBack,
    handleNext: handleNext,
  };

  const displayPage = () => {
    switch (part) {
      case 0: {
        return (
          <CreateDisplayName userData={userData.displayName} {...functions} />
        );
      }
      case 1: {
        return (
          <CreateGenderAndBirthday
            userData={userData.displayName}
            {...functions}
          />
        );
      }
      case 2: {
        return <CreateUserName userData={userData.username} {...functions} />;
      }

      case 3: {
        return <CreatePassword userData={userData.password} {...functions} />;
      }
      case 4: {
        return <CreatePic userData={userData.pic} {...functions} />;
      }
      case 5: {
        return <UserForm {...config} data={registerText["confirm"]} />;
      }
      default:
        return (
          <CreateDisplayName userData={userData.displayName} {...functions} />
        );
    }
  };

  return displayPage();
};
export default RegisterPage;
