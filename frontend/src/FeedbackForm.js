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

      <form className="form" onSubmit={submitFeedback}>
        <h3>Add Feedback</h3>

        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <textarea
          placeholder="Your Feedback"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <button type="submit" disabled={!projectName}>
          Submit
        </button>
      </form>
    </>
  );
}

export default FeedbackForm;