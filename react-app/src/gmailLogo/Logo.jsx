import React from "react";
import "./Logo.css";

const Logo = ({ containerClass }) => {
  return (
    <div className={`logo-container ${containerClass}`}>
      <svg
        width="251"
        height="75"
        viewBox="0 0 251 75"
        fill="none"
        alt="Gmail logo"
        id="gmail-icon"
      >
        <g id="LogoGroup">
          <g id="IconGroup" transform="translate(3, 3)">
            <path
              id="Envelope"
              d="M 2.5 17.5 L 72.5 17.5 L 72.5 52.5 L 22.5 52.5 L 12.5 62.5 L 12.5 52.5 L 2.5 52.5 Z"
              stroke="#D93025"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Flap"
              d="M 2.5 17.5 L 37.5 37.5 L 72.5 17.5"
              stroke="#D93025"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <text
            id="logo-text"
            x="85"
            y="58"
            fill="#D93025"
          >
            SayHi
          </text>
        </g>
      </svg>
    </div>
  );
};

export default Logo;
