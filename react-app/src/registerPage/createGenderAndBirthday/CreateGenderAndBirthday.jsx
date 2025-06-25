import React, { useState } from "react";
import UserForm from "../../userForm/UserForm";
import Text from "./text.json";

const CreateGenderAndBirthday = (props) => {
  const [birthDay, setBirthDay] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [gender, setGender] = useState("");
  const [BDErrorText, setBDError] = useState(null);
  const [GErrorText, setGError] = useState(null);

  const createBirthDay = async () => {
    const monthJson = Text.birthDay.find((item) => item.name === "month");
    const monthIndex = monthJson ? monthJson.options.indexOf(birthDay.month) : -1;

    // Calculate the month number (1-12). If not found, it will be 0.
    const monthNum = monthIndex !== -1 ? monthIndex + 1 : 0;
    // const numM = monthJson.options.indexOf(birthDay.month) + 1;

    const res = await fetch("/api/users/birthday", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        day: birthDay.day,
        month: monthNum,
        year: birthDay.year,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      //   setBirthDay({ day: "", month: "", year: "" });
      setBDError(null);
      props.setUserData("birthday", data.birthday);
      //   props.handleNext();
      return true;
    } else {
      setBDError(data.error);
      return false;
    }
  };

  const createGender = async () => {
    // console.log("gender: " + gender);
    const res = await fetch("/api/users/gender", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gender }),
    });
    const data = await res.json();
    if (res.ok) {
      props.setUserData("gender", data.gender);
      setGError(null);
      return true;
      //   return 200;
    } else {
      setGError(data.error);
      return false;
    }
    // return res.status;
  };

  const handleGenderAgeSub = async (e) => {
    e.preventDefault();
    const bdStatuse = await createBirthDay();
      const genderStatuse = await createGender();

    if (bdStatuse && genderStatuse) {
      //if the date was valid, continu to check gender

      // if (genderStatuse) {
        setBirthDay({ day: "", month: "", year: "" });
        setGender("");
        // console.log("birthday: " + birthDay.date + " gender " + gender);
        props.handleNext();
      // }
    }
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

  const config = {
    errorText: [BDErrorText, GErrorText],
    buttonsConf: {
      ClickFunc: props.handleBack,
      SubmitFunc: handleGenderAgeSub,
    },
    bDayConf: [
      {
        inputClass: !BDErrorText ? "no-input" : "bad-input",
        inputValue: birthDay.day,
        name: "day",
        setVal: handleBdayChange,
      },
      {
        inputClass: !BDErrorText ? "no-input" : "bad-input",
        inputValue: birthDay.month,
        name: "month",
        setVal: handleBdayChange,
      },
      {
        inputClass: !BDErrorText ? "no-input" : "bad-input",
        inputValue: birthDay.year,
        name: "year",
        setVal: handleBdayChange,
      },
    ],

    selectConf: {
      inputClass: !GErrorText ? "no-input" : "bad-input",
      inputValue: gender,
      setVal: (e) => setGender(e.target.value),
    },
  };
  return <UserForm {...config} data={Text} />;
};

export default CreateGenderAndBirthday;
