import express from "express";
import { Friend } from "../models/index.js";

const router = express.Router();

// Get friends for user
router.get("/:userId", async (req, res) => {
  try {
    const friends = await Friend.findAll({ where: { user_id: req.params.userId } });
    res.json(friends);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch friends" });
  }
});

// Add friend
router.post("/", async (req, res) => {
  try {
    const friend = await Friend.create(req.body);
    res.json(friend);
  } catch (err) {
    res.status(500).json({ error: "Failed to add friend" });
  }
});

export default router;