import React, { useRef, useState } from "react";
import "./FormImage.css";

const FormImage = ({ inputClass, src, fileName, setVal, data }) => {
  const fileInputRef = useRef(null);

console.log("FormImage props:", { src, fileName, data });

  const handleClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        className={data.className}
        id={data.id}
        type={data.type}
        accept={data.fileType}
        onChange={setVal}
        placeholder={data.placeHolder}
      />

      {src && <img src={src} alt={data.alt} width={200} />}
      <button className={`${inputClass} form-btn`} onClick={handleClick}>Choose Image</button>
      <p>{fileName}</p>

    </>
  );
};

export default FormImage;
