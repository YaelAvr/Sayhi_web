import "./ConfirmSub.css";
import React from "react";

const ConfirmSub = ({ userData, data }) => {
  return (
    <div className="confirm-sub">
      confirm dits
      <img
        id="chosen-pic"
        className="form-pic"
        src={userData.preview}
        alt={data.alt}
        width={200}
      />
    </div>
  );
};
export default ConfirmSub;
