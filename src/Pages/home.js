import React, { useEffect, useState } from "react";
import "./home.css";

function Home() {
  const [feedback, setFeedback] = useState([]);
  const [message, setMessage] = useState("");

  // Load feedback
  const loadFeedback = async () => {
    const res = await fetch("http://localhost:8081/api/feedback");
    const data = await res.json();
    setFeedback(data);
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  // Submit feedback
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8081/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    setMessage("");
    loadFeedback();
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    await fetch(`http://localhost:8081/api/feedback/${id}`, {
      method: "DELETE",
    });

    loadFeedback();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
  <div className="dashboard">

    {/* Navbar */}
    <div className="navbar">
      <h2>Feedback System</h2>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>

    {/* Centered Form */}
    <div className="form-container">
      <div className="form-card">
        <h3>Share Your Feedback 💬</h3>

        <form className="feedback-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Write your feedback here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit">Submit Feedback</button>
        </form>
      </div>
    </div>

    {/* Feedback List */}
    <div className="feedback-list">
      <h3>All Feedback</h3>

      {feedback.map((item) => (
        <div key={item.id} className="feedback-card">
          <p>{item.message}</p>
          <button onClick={() => deleteFeedback(item.id)}>Delete</button>
        </div>
      ))}
    </div>

  </div>
);
}

export default Home;