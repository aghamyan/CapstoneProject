import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { getHabits, createHabit } from "../services/habits";

export const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabits = async () => {
      if (!user?.id) {
        setHabits([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getHabits(user.id);
        setHabits(data);
      } catch (err) {
        console.error("❌ Failed to fetch habits:", err);
        setHabits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, [user?.id]);

  const addHabit = async ({ title, description = "", category = "" }) => {
    if (!user?.id) return null;
    try {
      const newHabit = await createHabit({
        user_id: user.id,
        title,
        description,
        category,
      });
      setHabits((prev) => [...prev, newHabit]);
      return newHabit;
    } catch (err) {
      console.error("❌ Failed to add habit:", err);
      throw err;
    }
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit, loading }}>
      {children}
    </HabitContext.Provider>
  );
};
