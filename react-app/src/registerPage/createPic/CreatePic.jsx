import React, { useState, useEffect } from "react";
import UserForm from "../../userForm/UserForm";
// import {handleBack, handleNext } from "../RegisterPage";

const CreatePic = (props) => {
  const [picture, setPicture] = useState({
    name: "",
    img: null,
    url: null,
  });
  const [errorText, setError] = useState(null);

  const handleImageChange = async (e) => {
    console.log("here");
    const file = e.target.files[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);

    setPicture({
      name: file.name,
      img: file,
      url: fileUrl,
    });

    console.log( picture.name +" "+ picture.img +" "+picture.url);
    
    // if (file && file.type.startsWith("image/")) {
    //   setImage(file);
    //   setPreview(URL.createObjectURL(file));
    // } else {
    //   alert("אנא בחרי קובץ שהוא תמונה בלבד");
    // }
  };

  const uploadImage = async (e) => {
    e.preventDefault();

    // if (!image) return;
    // const formData = new FormData();
    // formData.append("image", image);
    // try {
    //   const res = await fetch("/api/upload", {
    //     method: "POST",
    //     body: formData,
    //   });
    //   const data = await res.json();
    //   alert(data.message || "העלאה הצליחה");
    // } catch (err) {
    //   alert("שגיאה בהעלאה");
    // }
  };

  const config = {
    buttonsConf: { ClickFunc: props.handleBack, SubmitFunc: uploadImage },
    inputsConf: {
      inputClass: !errorText ? "no-input" : "bad-input",
      // inputValue: password.password,
      src: picture.url,
      fileName: picture.name,
      //   img: picture.img,
      setVal: handleImageChange,
    },
    errorText: errorText,
  };
  return <UserForm key={picture.url} {...config} data={props.partText} />;
};

export default CreatePic;
