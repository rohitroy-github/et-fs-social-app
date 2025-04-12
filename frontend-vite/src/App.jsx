import { useState } from "react";
import "./App.css";
import LoginButton from "./components/LoginButton";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginButton />
    </div>
  );
}

export default App;
