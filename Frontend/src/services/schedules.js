// src/services/schedules.js
import { apiGet, apiPost, apiPut, apiDelete } from "./api";

export const getSchedules = (userId) => apiGet(`/schedules/user/${userId}`);

export const createSchedule = (payload) => apiPost("/schedules", payload);

export const updateSchedule = (id, payload) => apiPut(`/schedules/${id}`, payload);

export const deleteSchedule = (id) => apiDelete(`/schedules/${id}`);
