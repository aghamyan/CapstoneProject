import api from "./api";
export const getLibrary = () => api.get("/library").then(r => r.data);
export const addHabitFromLibrary = (userId, habit) =>
  api.post("/habits", { ...habit, user_id: userId }).then(r => r.data);