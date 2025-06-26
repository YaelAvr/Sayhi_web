import React, { useState } from "react";
import UserForm from "../../userForm/UserForm";
import Text from "./text.json"

const CreatePic = (props) => {
  const [picture, setPicture] = useState({
    name: "",
    img: null,
    url: null,
  });
  const [errorText, setError] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      setPicture({
        name: file.name,
        img: file,
        url: URL.createObjectURL(file),
      });
      setError("");
    } else {
      setPicture({
        name: "",
        img: null,
        url: null,
      });
      setError(
        `The file "${file.name}" is not a supported image format. Please try again with one of the following types: JPG, PNG, GIF, WEBP`
      );
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append("profilePic", picture.img);

    try {
      const res = await fetch("/api/users/picture", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (res.ok) {
        props.setUserData("preview", picture.url);
        props.setUserData("picture", data.tempImageUrl);
        setPicture({ name: "", img: null, url: null });
        setError(null);
        props.handleNext();
      } else {
        setError(data.error);
      }
    } catch (err) {
      alert("An error occurred: ", err.message);
    }
  };

  const config = {
    buttonsConf: { ClickFunc: props.handleBack, SubmitFunc: handleImageUpload },
    inputsConf: {
      inputClass: !errorText ? "no-input" : "bad-input",
      src: picture.url,
      fileName: picture.name,
      setVal: handleImageChange,
    },
    errorText: errorText,
  };
  return <UserForm key={picture.url} {...config} data={Text} />;
};

export default CreatePic;
