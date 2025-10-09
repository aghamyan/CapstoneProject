import api from "./api";

export const getHabitProgress = (userId) =>
  api.get(`/analytics/${userId}/habit-progress`).then(r => r.data);