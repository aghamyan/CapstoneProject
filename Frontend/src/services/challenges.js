import api from "./api";

export const fetchChallenges = () =>
  api.get("/group-challenges").then((r) => r.data);

export const joinChallenge = (challengeId, userId) =>
  api.post(`/group-challenges/${challengeId}/join`, { userId }).then((r) => r.data);
