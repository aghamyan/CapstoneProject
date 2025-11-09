// backend/routes/analyticsRoutes.js
import express from "express";
import { Habit, Progress } from "../models/index.js";

const router = express.Router();

/**
 * GET /api/analytics/progress?userId=123
 * Returns per-habit time series
 */
router.get("/progress", async (req, res) => {
  try {
    const userId = Number(req.query.userId);
    if (!userId) return res.status(400).json({ error: "userId is required" });

    const rows = await Progress.findAll({
      where: { user_id: userId },
      include: [{ model: Habit, attributes: ["id", "title"] }],
      order: [["progress_date", "ASC"], ["id", "ASC"]],
    });

    const perHabit = {};
    for (const r of rows) {
      const hid = r.habit_id;
      const date = r.progress_date;
      const habitName = r.Habit?.title || `Habit ${hid}`;
      if (!perHabit[hid]) perHabit[hid] = { habitName, byDate: {} };

      const delta = r.status === "done" ? 1 : r.status === "missed" ? -1 : 0;
      perHabit[hid].byDate[date] = Math.max(
        0,
        (perHabit[hid].byDate[date] || 0) + delta
      );
    }

    const payload = Object.entries(perHabit).map(([hid, obj]) => {
      const points = Object.entries(obj.byDate)
        .sort((a, b) => (a[0] < b[0] ? -1 : 1))
        .map(([date, value]) => ({ date, value }));
      return { habitId: Number(hid), habitName: obj.habitName, points };
    });

    res.json(payload);
  } catch (err) {
    console.error("❌ Failed to fetch progress analytics:", err);
    res.status(500).json({ error: "Failed to fetch progress analytics" });
  }
});

export default router;
