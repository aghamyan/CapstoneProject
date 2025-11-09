import express from "express";
import GroupChallenge from "../models/GroupChallenge.js";
import UserGroupChallenge from "../models/UserGroupChallenge.js";

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
    const { challengeId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const challenge = await GroupChallenge.findByPk(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    const [record, created] = await UserGroupChallenge.findOrCreate({
      where: { user_id: userId, challenge_id: challengeId },
      defaults: { user_id: userId, challenge_id: challengeId },
    });

    res.json({
      message: created ? "Joined challenge" : "Already joined",
      participation: record,
    });
  } catch (err) {
    console.error("❌ Failed to join challenge:", err);
    res.status(500).json({ error: "Failed to join challenge" });
  }
});

export default router;
