import React, { useEffect, useState } from "react";
import { CCard, CCardHeader, CCardBody, CButton } from "@coreui/react";
import { getLibrary, addHabitFromLibrary } from "../../services/library";

const HabitLibrary = () => {
  const [list, setList] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    (async () => setList(await getLibrary()))();
  }, []);

  const add = async (h) => {
    await addHabitFromLibrary(user.id, h);
    alert(`✅ Added "${h.name}"`);
  };

  return (
    <CCard>
      <CCardHeader>📚 Habit Library</CCardHeader>
      <CCardBody>
        {list.map((h, i) => (
          <div key={i} className="mb-3 border-bottom pb-2">
            <strong>{h.name}</strong>
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