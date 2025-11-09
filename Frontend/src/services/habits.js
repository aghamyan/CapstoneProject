// /src/services/habits.js
import { apiGet, apiPost, apiDelete } from "./api";

const BASE = "/habits";

export const getHabits = async (userId) => {
  if (!userId) throw new Error("userId is required");
  return apiGet(`${BASE}/user/${userId}`);
};

export const createHabit = async ({ user_id, title, description, category }) => {
  if (!user_id || !title) throw new Error("user_id and title are required");
  return apiPost(BASE, {
    user_id,
    title,
    description: description || "",
    category: category || "",
  });
};

export const deleteHabit = async (id) => apiDelete(`${BASE}/${id}`);
