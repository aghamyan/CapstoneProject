import express from "express";
import GroupChallenge from "../models/GroupChallenge.js";

const router = express.Router();

// Get all challenges
router.get("/", async (req, res) => {
  try {
    const challenges = await GroupChallenge.findAll();
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch challenges" });
  }
});

// Join a challenge
router.post("/:challengeId/join", async (req, res) => {
  try {
    const { userId } = req.body;
    // Create record in UserGroupChallenge if you use one
    res.json({ message: "Joined challenge" });
  } catch (err) {
    res.status(500).json({ error: "Failed to join challenge" });
  }
});

export default router;