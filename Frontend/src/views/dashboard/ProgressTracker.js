import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CListGroup,
  CListGroupItem,
  CAlert,
} from "@coreui/react";
import { getHabits } from "../../services/habits";

const ProgressTracker = () => {
  const [habits, setHabits] = useState([]);
  const [progress, setProgress] = useState({});
  const [err, setErr] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  useEffect(() => {
    if (!userId) {
      setErr("Please login to track progress");
      return;
    }
    (async () => {
      try {
        const data = await getHabits(userId);
        setHabits(data);
      } catch {
        setErr("Failed to load habits");
      }
    })();
  }, [userId]);

  const markDone = async (habitId) => {
    try {
      const res = await fetch(
        `http://localhost:5001/api/progress/${habitId}/done`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update progress");

      setProgress((prev) => ({ ...prev, [habitId]: data.progress.status }));
    } catch (error) {
      console.error("❌ Failed to update progress", error);
      setErr(error.message || "Failed to update progress");
    }
  };

  return (
    <CCard className="mt-4">
      <CCardHeader>📈 Progress Tracker</CCardHeader>
      <CCardBody>
        {err && <CAlert color="danger">{err}</CAlert>}

        <CListGroup>
          {habits.length === 0 && <CListGroupItem>No habits yet</CListGroupItem>}
          {habits.map((h) => (
            <CListGroupItem key={h.id}>
              {h.title} — {progress[h.id] || "pending"}
              <CButton
                color="success"
                size="sm"
                className="float-end"
                onClick={() => markDone(h.id)}
              >
                Mark Done
              </CButton>
            </CListGroupItem>
          ))}
        </CListGroup>
      </CCardBody>
    </CCard>
  );
};

export default ProgressTracker;
