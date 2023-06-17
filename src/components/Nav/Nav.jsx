import React, { useEffect } from "react";
import "./Nav.css";
import filmLogo from "../../assets/filmLogo.png";
import Avatar from "react-avatar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  }, []);
  return (
    <div className={`nav ${show && "nav__black"} `}>
      <div className="nav__contents">
        <img
          src={filmLogo}
          alt=""
          className="nav__logo"
          onClick={() => navigate("/")}
        />

        <Avatar
          name=": D"
          size="60"
          className="nav__avatar"
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
};

export default Nav;
