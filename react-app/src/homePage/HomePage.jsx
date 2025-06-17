import React from "react";
import "./HomePage.css";
import { useState, useRef, memo } from "react";
import Logo from "../gmailLogo/Logo"
import { useNavigate } from 'react-router-dom';
import LoginPage from "../loginPage/LoginPage";

const HomePage =()=>{
  const navigate = useNavigate();

    return(
        <button className="Home-page-btn" type="button" onClick={()=> navigate(<LoginPage/>)}>Log in</button>
    )
}

export default HomePage