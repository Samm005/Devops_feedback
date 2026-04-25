import React, { useState } from "react";
import "./home.css";
import FeedbackForm from "../FeedbackForm";
import FeedbackList from "../FeedbackList";

function Home() {
  const [reloadFlag, setReloadFlag] = useState(false);

  const reload = () => {
    setReloadFlag(!reloadFlag);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="dashboard">
      <div className="navbar">
        <h2>Feedback System</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="form-container">
        <div className="form-card">
          <FeedbackForm reload={reload} />
        </div>
      </div>

      <div className="feedback-list">
        <FeedbackList key={reloadFlag} />
      </div>
    </div>
  );
}

export default Home;