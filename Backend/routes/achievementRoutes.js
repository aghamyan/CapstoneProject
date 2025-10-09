import express from "express";
import { Achievement, UserAchievement } from "../models/index.js";

const router = express.Router();

// All achievements
router.get("/", async (req, res) => {
  try {
    const achievements = await Achievement.findAll();
res.json(achievements);             
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch achievements" });
  }
});

// Give achievement to user
router.post("/assign", async (req, res) => {
  try {
    const { user_id, achievement_id } = req.body;
    const ua = await UserAchievement.create({ user_id, achievement_id });
    res.json(ua);
  } catch (err) {
    res.status(500).json({ error: "Failed to assign achievement" });
  }
});

export default router;