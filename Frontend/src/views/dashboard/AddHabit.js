import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CFormCheck,
  CListGroup,
  CListGroupItem,
  CAlert,
} from "@coreui/react";
import { getHabits, createHabit, deleteHabit } from "../../services/habits";

const AddHabit = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({
    title: "",
    description: "",
    category: "",
    target_reps: "",
    is_daily_goal: false,
  });
  const [err, setErr] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const loadHabits = async () => {
    try {
      if (!userId) return;
      const data = await getHabits(userId);
      setHabits(data);
    } catch {
      setErr("Failed to load habits");
    }
  };

  useEffect(() => {
    if (userId) loadHabits();
  }, [userId]);

  const handleAddHabit = async () => {
    try {
      if (!newHabit.title.trim()) return setErr("Habit title is required");
      setErr("");

      const payload = {
        user_id: userId,
        title: newHabit.title,
        description: newHabit.description,
        category: newHabit.category,
      };

      const created = await createHabit(payload);
      setHabits((prev) => [...prev, created]);

      setNewHabit({
        title: "",
        description: "",
        category: "",
        target_reps: "",
        is_daily_goal: false,
      });
    } catch {
      setErr("Failed to create habit");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHabit(id);
      setHabits((prev) => prev.filter((h) => h.id !== id));
    } catch {
      setErr("Failed to delete habit");
    }
  };

  return (
    <CRow className="mt-4">
      <CCol xs={12} md={8} className="mx-auto">
        <CCard>
          <CCardHeader>➕ Add Habit</CCardHeader>
          <CCardBody>
            {err && <CAlert color="danger">{err}</CAlert>}

            <CForm>
              <CFormLabel>Habit Title</CFormLabel>
              <CFormInput
                placeholder="e.g. Morning Run"
                value={newHabit.title}
                onChange={(e) =>
                  setNewHabit({ ...newHabit, title: e.target.value })
                }
              />

              <CFormLabel className="mt-2">Description</CFormLabel>
              <CFormInput
                placeholder="Short description"
                value={newHabit.description}
                onChange={(e) =>
                  setNewHabit({ ...newHabit, description: e.target.value })
                }
              />

              <CFormLabel className="mt-2">Category</CFormLabel>
              <CFormInput
                placeholder="Health, Study, Fitness..."
                value={newHabit.category}
                onChange={(e) =>
                  setNewHabit({ ...newHabit, category: e.target.value })
                }
              />

              <CFormLabel className="mt-3">Target repetitions (optional)</CFormLabel>
              <CFormInput
                type="number"
                placeholder="e.g. 100"
                value={newHabit.target_reps}
                onChange={(e) =>
                  setNewHabit({ ...newHabit, target_reps: e.target.value })
                }
              />

              <CFormCheck
                className="mt-2"
                label="Daily goal (resets every day)"
                checked={newHabit.is_daily_goal}
                onChange={(e) =>
                  setNewHabit({ ...newHabit, is_daily_goal: e.target.checked })
                }
              />

              <CButton className="mt-3" color="primary" onClick={handleAddHabit}>
                Add Habit
              </CButton>
            </CForm>

            <hr />

            <CListGroup>
              {habits.length === 0 && (
                <CListGroupItem>No habits yet</CListGroupItem>
              )}
              {habits.map((h) => (
                <CListGroupItem key={h.id}>
                  <strong>{h.title}</strong> — {h.description || "No description"}{" "}
                  {h.category && <em>({h.category})</em>}
                  <CButton
                    color="danger"
                    size="sm"
                    className="float-end"
                    onClick={() => handleDelete(h.id)}
                  >
                    Delete
                  </CButton>
                </CListGroupItem>
              ))}
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AddHabit;
