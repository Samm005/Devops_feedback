import React, { useState } from "react";

function FeedbackForm({ reload }) {
  const [projectName, setProjectName] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const submitFeedback = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/feedback/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName,
          rating,
          message,
          category,
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
    <form className="form" onSubmit={submitFeedback}>
      <h3>Add Feedback</h3>

      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        required
      />

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

      <button type="submit">Submit</button>
    </form>
  );
}

export default FeedbackForm;