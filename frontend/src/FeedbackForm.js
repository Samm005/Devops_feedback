import React, { useState } from "react";

function FeedbackForm({ reload }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submitFeedback = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8080/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, message }),
    });

    alert("✅ Feedback Submitted!");

    setName("");
    setMessage("");
    reload();
  };

  return (
    <form className="form" onSubmit={submitFeedback}>
      <h3>Add Feedback</h3>

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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