import React, { useEffect, useState } from "react";
import { CCard, CCardHeader, CCardBody, CAlert, CSpinner } from "@coreui/react";
import { getHabitProgress } from "../../services/analytics";

const ReportsAnalytics = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  useEffect(() => {
    const load = async () => {
      if (!userId) {
        setError("Please login to view analytics");
        setLoading(false);
        return;
      }
      try {
        const data = await getHabitProgress(userId);
        setSeries(data);
      } catch (err) {
        console.error("❌ Failed to load analytics", err);
        setError("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userId]);

  return (
    <CCard className="mt-4">
      <CCardHeader>📊 Progress Analytics</CCardHeader>
      <CCardBody>
        {loading && (
          <div className="text-center my-4">
            <CSpinner color="primary" />
          </div>
        )}
        {error && <CAlert color="danger">{error}</CAlert>}
        {!loading && !error && series.length === 0 && (
          <CAlert color="info">No progress data yet.</CAlert>
        )}
        {series.map((habit) => (
          <div key={habit.habitId} className="mb-4">
            <h5>{habit.habitName}</h5>
            <ul className="mb-0">
              {habit.points.map((point) => (
                <li key={`${habit.habitId}-${point.date}`}>
                  {point.date}: {point.value}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </CCardBody>
    </CCard>
  );
};

export default ReportsAnalytics;
