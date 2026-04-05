import React, { useEffect, useState } from "react";
import "./home.css";

function Home() {
  const [feedback, setFeedback] = useState([]);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  const username = localStorage.getItem("user");

  const loadFeedback = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/feedback");
      const data = await res.json();
      setFeedback(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating ⭐");
      return;
    }

    try {
      await fetch("http://localhost:8080/api/feedback/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName: "General",
          rating,
          category: "General",
          message,
          username,
        }),
      });

      setMessage("");
      setRating(0);
      loadFeedback();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteFeedback = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/feedback/delete/${id}`, {
        method: "DELETE",
      });
      loadFeedback();
    } catch (err) {
      console.error(err);
    }
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
          <h3>Share Your Feedback 💬</h3>

          <div style={{ marginBottom: "15px" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{
                  fontSize: "28px",
                  cursor: "pointer",
                  color: star <= rating ? "#FFD700" : "#ccc",
                  marginRight: "5px",
                }}
              >
                ★
              </span>
            ))}
          </div>

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

      <div className="feedback-list">
        <h3>All Feedback</h3>

        {Array.isArray(feedback) &&
          feedback.map((item) => (
            <div key={item.id} className="feedback-card">
              <p><strong>{item.username}</strong></p>

              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      color: star <= item.rating ? "#FFD700" : "#ccc",
                      fontSize: "18px",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p>{item.message}</p>

              <button onClick={() => deleteFeedback(item.id)}>
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;