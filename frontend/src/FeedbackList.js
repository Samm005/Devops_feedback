import React, { useEffect, useState } from "react";

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    projectName: "",
    rating: 0,
    category: "",
    message: "",
  });

  const fetchFeedback = async () => {
    const res = await fetch("/api/feedback");
    const data = await res.json();
    if (data.success) setFeedbacks(data.data);
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const deleteFeedback = async (id) => {
    await fetch(`/api/feedback/delete/${id}`, {
      method: "DELETE",
    });
    fetchFeedback();
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditData({
      projectName: item.projectName,
      rating: item.rating,
      category: item.category,
      message: item.message,
    });
  };

  const handleUpdate = async (id) => {
    const res = await fetch(`/api/feedback/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });

    const data = await res.json();

    if (data.success) {
      setEditingId(null);
      fetchFeedback();
    } else {
      alert("Update failed");
    }
  };

  return (
    <div className="feedback-list">
      <h2>All Feedback</h2>

      {feedbacks.map((item) => (
        <div key={item.id} className="feedback-card">

          {editingId === item.id ? (
            <>
              <input
                value={editData.projectName}
                onChange={(e) =>
                  setEditData({ ...editData, projectName: e.target.value })
                }
              />

              <input
                type="number"
                value={editData.rating}
                onChange={(e) =>
                  setEditData({ ...editData, rating: Number(e.target.value) })
                }
              />

              <input
                value={editData.category}
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
              />

              <textarea
                value={editData.message}
                onChange={(e) =>
                  setEditData({ ...editData, message: e.target.value })
                }
              />

              <button onClick={() => handleUpdate(item.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3 className="product-title">{item.projectName}</h3>

              <div className="stars">
                {"★".repeat(item.rating)}
                {"☆".repeat(5 - item.rating)}
              </div>

              <p>{item.message}</p>

              <button onClick={() => startEdit(item)}>Edit</button>
              <button onClick={() => deleteFeedback(item.id)}>Delete</button>
            </>
          )}

        </div>
      ))}
    </div>
  );
}

export default FeedbackList;