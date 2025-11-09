import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    JSON.parse(user); // placeholder for future token usage
  }
  return config;
});

const API_BASE = "http://localhost:5001/api";

const handleResponse = async (res, url) => {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request to ${url} failed`);
  }
  return res.json();
};

export const apiGet = (url) => fetch(`${API_BASE}${url}`).then((res) => handleResponse(res, url));

export const apiPost = (url, body) =>
  fetch(`${API_BASE}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => handleResponse(res, url));

export const apiPut = (url, body) =>
  fetch(`${API_BASE}${url}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => handleResponse(res, url));

export const apiDelete = (url) =>
  fetch(`${API_BASE}${url}`, { method: "DELETE" }).then((res) => handleResponse(res, url));

export default api;
