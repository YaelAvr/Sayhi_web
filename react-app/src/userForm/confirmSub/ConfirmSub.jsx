import "./ConfirmSub.css";
import React from "react";

const ConfirmSub = ({ userData, data }) => {
  return (
    <div className="confirm-sub fill-parent-width form-flex-row">
      <img
        id="privew-pic"
        className="form-pic"
        src={userData.preview}
        alt={data.alt}
      />
      <div className="conf-text-wrapper">
        <p id="confirm-disname" className="conf-text-line">
          {userData.displayName}
        </p>
        <p id="confirm-username" className="conf-text-line">
          {userData.username}@sayhi.com
        </p>
      </div>
    </div>
  );
};
export default ConfirmSub;
