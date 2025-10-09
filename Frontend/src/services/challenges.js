import api from "./api";
export const fetchChallenges = () => api.get("/challenges").then(r => r.data);
export const joinChallenge  = (challengeId, userId) =>
  api.post(`/challenges/${challengeId}/join`, { userId }).then(r => r.data);