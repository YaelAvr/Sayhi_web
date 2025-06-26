import React, { useRef, useState } from "react";
import "./FormImage.css";

const FormImage = ({ inputClass, src, fileName, setVal, data }) => {
  const fileInputRef = useRef(null);
  
  const handleClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  return (
    <div className="form-image-container">
      <input
        ref={fileInputRef}
        className={data.className}
        id={data.id}
        type={data.type}
        accept={data.fileType}
        onChange={setVal}
        placeholder={data.placeHolder}
      />

      {src && <img id="chosen-pic" className="form-pic" src={src} alt={data.alt} width={200} />}
      {fileName&&<p>{fileName}</p>}
      <button className={`${inputClass} form-btn`} onClick={handleClick}>Choose Image</button>

    </div>
  );
};

export default FormImage;
