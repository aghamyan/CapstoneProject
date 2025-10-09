import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CAlert,
  CButton,
  CSpinner,
  CBadge,
} from "@coreui/react";

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const [todayCounts, setTodayCounts] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Load habits for logged-in user
  useEffect(() => {
    const loadHabits = async () => {
      try {
        if (!user?.id) {
          setError("Please login first");
          setLoading(false);
          return;
        }

        const res = await fetch(`http://localhost:5001/api/habits/user/${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch habits");

        const data = await res.json();
        console.log("✅ Habits loaded:", data);
        setHabits(data);
      } catch (err) {
        console.error("❌ Error loading habits:", err);
        setError(err.message || "Failed to load habits");
      } finally {
        setLoading(false);
      }
    };

    loadHabits();
  }, [user?.id]);

  // ✅ Convert progress rows into { habitId: count }
  const rowsToCounts = (rows) => {
    const counts = {};
    rows.forEach((r) => {
      const hid = r.habit_id;
      if (!counts[hid]) counts[hid] = 0;
      if (r.status === "done") counts[hid] += 1;
      else if (r.status === "missed") counts[hid] = Math.max(0, counts[hid] - 1);
    });
    return counts;
  };

  // ✅ Fetch today's progress for all habits
  const loadTodayProgress = async () => {
    try {
      if (!user?.id) return;

      const res = await fetch(`http://localhost:5001/api/progress/today/${user.id}`);
      if (!res.ok) throw new Error("Failed to fetch progress");

      const rows = await res.json();
      console.log("✅ Progress today:", rows);
      setTodayCounts(rowsToCounts(rows));
    } catch (err) {
      console.warn("⚠️ Failed to fetch today’s progress:", err);
    }
  };

  useEffect(() => {
    loadTodayProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // ✅ Handle “Done” / “Missed” actions
  const handlePress = async (habitId, isPlus) => {
    try {
      const body = { userId: user.id, status: isPlus ? "done" : "missed" };

      const res = await fetch(`http://localhost:5001/api/progress/${habitId}/log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.error || "Failed to log progress");

      // Refresh after log
      await loadTodayProgress();
    } catch (err) {
      console.error("❌ Server error:", err);
      alert("Server error");
    }
  };

  return (
    <CRow className="mt-4">
      <CCol xs={12}>
        <CCard>
          <CCardHeader>📊 Today’s Habit Tracker</CCardHeader>
          <CCardBody>
            {/* LOADING */}
            {loading && (
              <div className="d-flex justify-content-center my-4">
                <CSpinner color="primary" />
              </div>
            )}

            {/* ERROR */}
            {error && <CAlert color="danger">{error}</CAlert>}

            {/* EMPTY */}
            {!loading && habits.length === 0 && !error && (
              <CAlert color="info">
                No habits yet. Add one from the “Add Habit” page to get started!
              </CAlert>
            )}

            {/* HABIT LIST */}
            {habits.map((h) => {
              const count = todayCounts[h.id] ?? 0;
              return (
                <div
                  key={h.id}
                  className="d-flex align-items-center justify-content-between py-2 border-bottom"
                >
                  {/* Left side: Habit info */}
                  <div>
                    <div className="fw-semibold">{h.title || h.name}</div>
                    {h.description && (
                      <div className="text-body-secondary small">
                        {h.description}
                      </div>
                    )}
                  </div>

                  {/* Right side: Buttons */}
                  <div className="d-flex align-items-center gap-2">
                    <CButton
                      color="danger"
                      size="sm"
                      onClick={() => handlePress(h.id, false)}
                      title="Missed / decrement"
                    >
                      −
                    </CButton>

                    <CBadge
                      color={count > 0 ? "success" : "secondary"}
                      className="px-3 py-2"
                    >
                      {count}
                    </CBadge>

                    <CButton
                      color="success"
                      size="sm"
                      onClick={() => handlePress(h.id, true)}
                      title="Done / increment"
                    >
                      Done
                    </CButton>
                  </div>
                </div>
              );
            })}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Dashboard;