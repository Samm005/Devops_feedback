import React, { useState } from "react";

function FeedbackForm({ reload }) {
  const [projectName, setProjectName] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const submitFeedback = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/feedback/create", {
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

    const data = await response.json();

    if (data.success) {
      alert("Feedback submitted successfully");
      setProjectName("");
      setRating(0);
      setCategory("");
      setMessage("");
      reload();
    } else {
      alert("Error submitting feedback");
    }
  };

  return (
    <form className="form" onSubmit={submitFeedback}>
      <h3>Add Feedback</h3>

      <select
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        required
      >
        <option value="">Select Product</option>
        <option value="Product 1">Product 1</option>
        <option value="Product 2">Product 2</option>
        <option value="Product 3">Product 3</option>
      </select>

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
