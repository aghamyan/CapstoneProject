import React, { useEffect, useState } from "react";
import { CCard, CCardHeader, CCardBody, CButton, CAlert } from "@coreui/react";
import { getLibrary, addHabitFromLibrary } from "../../services/library";

const HabitLibrary = () => {
  const [list, setList] = useState([]);
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    (async () => {
      try {
        const items = await getLibrary();
        setList(items);
      } catch {
        setMessage("Failed to load library");
      }
    })();
  }, []);

  const add = async (habit) => {
    try {
      if (!user?.id) {
        setMessage("Please login to add habits");
        return;
      }
      await addHabitFromLibrary(user.id, habit);
      setMessage(`✅ Added "${habit.title}"`);
    } catch {
      setMessage("Failed to add habit");
    }
  };

  return (
    <CCard>
      <CCardHeader>📚 Habit Library</CCardHeader>
      <CCardBody>
        {message && <CAlert color={message.startsWith("✅") ? "success" : "danger"}>{message}</CAlert>}
        {list.map((h, i) => (
          <div key={i} className="mb-3 border-bottom pb-2">
            <strong>{h.title}</strong>
            <p className="mb-2">{h.description}</p>
            <CButton size="sm" color="success" onClick={() => add(h)}>
              Add to My Habits
            </CButton>
          </div>
        ))}
      </CCardBody>
    </CCard>
  );
};

export default HabitLibrary;
