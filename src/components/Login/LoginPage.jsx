import React from "react";
import "./loginPage.css";
import filmLogo from "../../assets/filmLogo.png";
import { useState } from "react";
import SignUpScreen from "../SignUp/SignUp";

const LoginPage = () => {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="loginScreen">
      <img
        alt="loginScreen__logo"
        className="loginScreen__logo"
        src={filmLogo}
      />
      <button onClick={() => setSignIn(true)} className="loginScreen__button">
        Sign In
      </button>

      <div className="loginScreen__gradient" />

      <div className="loginScreen__body">
        {signIn ? (
          <SignUpScreen />
        ) : (
          <>
            <h1>Unlimited films, TV programmes and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>Ready to watch? Enter your email to start your trial</h3>

            <div className="loginScreen__input">
              <form>
                <input type="email" placeholder="Email Address" />
                <button
                  onClick={() => setSignIn(true)}
                  className="loginScreen__getStarted"
                  type="submit"
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
