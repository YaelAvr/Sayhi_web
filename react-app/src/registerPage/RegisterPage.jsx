import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../userForm/UserForm";
import registerText from "./confirmRegisterText.json";
import CreateUserName from "./createUserName.jsx/CreateUserName";
import CreatePic from "./createPic/CreatePic";
import CreatePassword from "./createPassword/CreatePassword";
import CreateDisplayName from "./createDisplayName/CreateDisplayName";
import CreateGenderAndBirthday from "./createGenderAndBirthday/CreateGenderAndBirthday";

const RegisterPage = () => {
  // initializing user registretion states
  const [userData, setUserData] = useState({
    displayName: "",
    birthday: "",
    gender: "",
    username: "",
    password: "",
    picture: "",
    preview: "",
  });

  const [errorText, setError] = useState(null);
  const [part, setPart] = useState(0);
  const navigate = useNavigate();

  // this function updates the userData state with the new data
  // it takes a field name and the new data as arguments
  const changeUserData = (fild, data) => {
    setUserData((prev) => ({ ...prev, [fild]: data }));
  };
  // this function initializes the registration process on restart button click
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

  // these functions handles the back and next buttons functionality
  const handleBack = () => {
    setPart((perv) => perv - 1);
  };
  const handleNext = () => {
    setPart((prev) => prev + 1);
  };

  // function to handle user final registration with the server
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

  // this object contains all the functions that are passed to the child components
  const functions = {
    setUserData: changeUserData,
    handleBack: handleBack,
    handleNext: handleNext,
  };

  // this function returns the current page based on the part state
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
