import { apiGet } from "./api";

export const getHabitProgress = (userId) =>
  apiGet(`/analytics/progress?userId=${userId}`);
