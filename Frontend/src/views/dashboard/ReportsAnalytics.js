import express from "express";
import { Progress, Habit } from "../models/index.js";


const router = express.Router();

// Fetch per-habit progress series
router.get("/progress", async (req, res) => {
  const { userId } = req.query;
  try {
    const progressRows = await Progress.findAll({
      where: { user_id: userId },
      include: [{ model: Habit, attributes: ["name"] }],
    });

    // Group by habit_id
    const grouped = {};
    for (const row of progressRows) {
      const hid = row.habit_id;
      if (!grouped[hid]) grouped[hid] = {
        habitId: hid,
        habitName: row.Habit.name,
        points: [],
      };
      grouped[hid].points.push({
        date: row.progress_date,
        value: row.status === "done" ? 1 : 0,
      });
    }

    const result = Object.values(grouped);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch progress analytics" });
  }
});

export default router;