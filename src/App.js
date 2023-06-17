import React, { useEffect } from "react";
import "./App.css";
import HomeScreen from "./components/Home/HomeScreen";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import { app } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice/userSlice";
import ProfilePage from "./components/ProfilePage/ProfilePage";
function App() {
  console.log("hi");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    // cleanup
    return unsubscribe;
  }, [dispatch, auth]);
  return (
    <>
      <div className="app">
        <header>
          <title>FilmVerse</title>
        </header>

        <main>
          <Routes>
            {!user ? (
              <>
                <Route path="/" element={<LoginPage />} />
              </>
            ) : (
              <>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/" element={<HomeScreen />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
