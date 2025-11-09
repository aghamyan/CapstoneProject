import api from "./api";

export const getLibrary = () => api.get("/library").then((r) => r.data);

export const addHabitFromLibrary = (userId, habit) =>
  api
    .post("/habits", {
      user_id: userId,
      title: habit.title,
      description: habit.description,
      category: habit.category,
    })
    .then((r) => r.data);
