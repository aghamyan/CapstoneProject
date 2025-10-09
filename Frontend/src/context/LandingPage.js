import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <h1>🚀 Welcome to StepHabit</h1>
      <p>Track your habits, build routines, and achieve goals.</p>
      <div>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Sign Up</button>
      </div>
    </div>
  );
};

export default LandingPage;