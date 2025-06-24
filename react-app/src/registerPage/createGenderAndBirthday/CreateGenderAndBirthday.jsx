import React, { useState } from "react";
import UserForm from "../../userForm/UserForm";
import Text from "./text.json"


const CreateGenderAndBirthday = (props) => {
  const [birthDay, setBirthDay] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [gender, setGender] = useState("");
  const [BDErrorText, setBDError] = useState(null);
  const [GErrorText, setGError] = useState(null);

  const createBirthDay = async (e) => {
    e.preventDefault();
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

    const data = await res.json();
    if (res.ok) {
      //   setBirthDay({ day: "", month: "", year: "" });
      setBDError(null);
      props.setUserData("birthDay", data.birthday);
      //   props.handleNext();
    } else {
      setBDError(data.error);
    }
    return res.status;
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

      //   return 200;
    } else {
      setGError(errorData.error);
    }
    return res.status;
  };

  const handleGenderAgeSub = async (e) => {
    e.preventDefault();
    const bdRes = await createBirthDay();

    if (!BDErrorText) {
      //if the date was valid, continu to check gender
      const genderRes = await createGender();

      if (!GErrorText) {
        setBirthDay({ day: "", month: "", year: "" });
        setGender("");
        // console.log("birthday: " + birthDay.date + " gender " + gender);
        handleNext();
      }
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
    errorText: (
      <>
        <p>{BDErrorText}</p>
        <br />
        <p>{GErrorText}</p>
      </>
    ),
    buttonsConf: { ClickFunc: handleBack, SubmitFunc: handleGenderAgeSub },
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
  return <UserForm key={picture.url} {...config} data={Text} />;
};

export default CreateGenderAndBirthday;
