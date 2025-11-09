import { Habit } from "../models/index.js";

export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.findAll({ where: { user_id: req.params.userId } });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch habits" });
  }
};

export const addHabit = async (req, res) => {
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
    res.status(500).json({ error: "Failed to create habit" });
  }
};

export const deleteHabit = async (req, res) => {
  try {
    const deleted = await Habit.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Habit not found" });
    res.json({ message: "Habit deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete habit" });
  }
};
