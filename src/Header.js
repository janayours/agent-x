import React from "react";

import logo from "./images/logo.PNG";

import profile from "./images/profile.JPG";

import "./Header.scss"

function Header() {
  return (
    <header>
      <div className="topnav">
        <div className="logo-cont"><img src={logo}/><span>Agent - X</span></div>
        <div className="profile-cont"> <img src={profile}/></div>
      </div>
    </header>
  );
}

export default Header;