import React from "react";
import "./profilePage.css";
import Nav from "../Nav/Nav";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice/userSlice";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";
import PlanPage from "../PlanPage/PlanPage";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const auth = getAuth();
  function onSignOut() {
    auth.signOut();
    return navigate("/");
  }
  return (
    <div className="profileScreen">
      <Nav />

      <div className="profileScreen__body">
        <h1 className="proflleScreen__body--title">Edit Profile</h1>
        <div className="profileScreen__info">
          <Avatar name="Cristina Z" size="80" />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <h3>Plans</h3>
              <PlanPage />
              <button onClick={onSignOut} className="profileScreen__signOut">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
