import React, { useState } from "react";

function FeedbackForm({ reload }) {
  const [projectName, setProjectName] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const submitFeedback = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/feedback/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName,
          rating,
          message,
          category,
          username: "testuser",
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Feedback Submitted ✅");

        setProjectName("");
        setRating(0);
        setCategory("");
        setMessage("");

        reload();
      } else {
        alert("Error submitting feedback");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error ❌");
    }
  };

  return (
    <>
      <div className="product-container">
        {["Women Blouse", "Children Shirt", "Men Flannel"].map((p) => (
          <div
            key={p}
            className={`product-card ${projectName === p ? "selected" : ""}`}
            onClick={() => setProjectName(p)}
          >
            <h4>{p}</h4>
          </div>
        ))}
      </div>

      <form className="feedback-form" onSubmit={submitFeedback}>
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

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <textarea
          placeholder="Write your feedback here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <button type="submit" disabled={!projectName}>
          Submit Feedback
        </button>
      </form>
    </>
  );
}

export default FeedbackForm;