// routes/habitRoutes.js
import express from "express";
import Habit from "../models/Habit.js";

const router = express.Router();

// ✅ Get all habits for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const habits = await Habit.findAll({
      where: { user_id: req.params.userId },
      order: [["created_at", "ASC"]],
    });
    res.json(habits);
  } catch (err) {
    console.error("❌ Error fetching habits:", err);
    res.status(500).json({ error: "Failed to fetch habits" });
  }
});

// ✅ Create new habit
router.post("/", async (req, res) => {
  try {
    const { user_id, title, description, category } = req.body;
    if (!user_id || !title) {
      return res.status(400).json({ error: "user_id and title are required" });
    }

    const habit = await Habit.create({
      user_id,
      title,
      description: description || null,
      category: category || null,
    });
    res.status(201).json(habit);
  } catch (err) {
    console.error("❌ Error creating habit:", err);
    res.status(500).json({ error: "Failed to create habit" });
  }
});

// ✅ Delete habit
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Habit.destroy({ where: { id: req.params.id } });
    if (deleted) res.json({ message: "Habit deleted successfully" });
    else res.status(404).json({ error: "Habit not found" });
  } catch (err) {
    console.error("❌ Error deleting habit:", err);
    res.status(500).json({ error: "Failed to delete habit" });
  }
});

export default router;
