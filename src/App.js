import React from "react";
import "./App.css";
import HomeScreen from "./components/Home/HomeScreen";

function App() {
  console.log("hi");
  return (
    <>
      <div>
        <header>
          <title>FilmVerse</title>
        </header>

        <main>
          <HomeScreen />
        </main>
      </div>
    </>
  );
}

export default App;
