// routes/scheduleRoutes.js
import express from "express";
import Schedule from "../models/Schedule.js";
import Habit from "../models/Habit.js";

const router = express.Router();

// GET schedules for a user (joins Habit by habit_id)
router.get("/user/:userId", async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      where: { userid: req.params.userId },
      include: [
        {
          model: Habit,
          attributes: ["id", "title"],
          required: false,
        },
      ],
      order: [["day", "ASC"], ["starttime", "ASC"]],
    });
    res.json(schedules);
  } catch (err) {
    console.error("❌ Error fetching schedules:", err);
    res.status(500).json({ error: "Failed to fetch schedules" });
  }
});

// POST create schedule (habit_id optional = custom event)
router.post("/", async (req, res) => {
  try {
    const {
      habit_id,
      userid,
      day,
      starttime,
      endtime,
      enddate,
      repeat,
      customdays,
      notes,
    } = req.body;

    if (!userid || !day || !starttime) {
      return res.status(400).json({ error: "userid, day and starttime are required" });
    }

    const created = await Schedule.create({
      habit_id: habit_id || null,
      userid,
      day,
      starttime,
      endtime: endtime || null,
      enddate: enddate || null,
      repeat: repeat || "daily",
      customdays: customdays || null,
      notes: notes || null,
    });

    res.status(201).json(created);
  } catch (err) {
    console.error("❌ Error creating schedule:", err);
    res.status(500).json({ error: "Failed to add schedule" });
  }
});

// PUT update schedule
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Schedule.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) return res.status(404).json({ error: "Schedule not found" });

    const refreshed = await Schedule.findByPk(req.params.id);
    res.json(refreshed);
  } catch (err) {
    console.error("❌ Error updating schedule:", err);
    res.status(500).json({ error: "Failed to update schedule" });
  }
});

// DELETE schedule
router.delete("/:id", async (req, res) => {
  try {
    const n = await Schedule.destroy({ where: { id: req.params.id } });
    if (!n) return res.status(404).json({ error: "Schedule not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("❌ Error deleting schedule:", err);
    res.status(500).json({ error: "Failed to delete schedule" });
  }
});

export default router;
