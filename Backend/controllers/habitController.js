import db from "../models/index.js";

const Habit = db.Habit;

// Get all habits
export const getHabits = async (req, res) => {
  const habits = await Habit.findAll();
  res.json(habits);
};

// Add new habit
export const addHabit = async (req, res) => {
  const { name, frequency, microStep, startDate, notes } = req.body;
  const habit = await Habit.create({ name, frequency, microStep, startDate, notes });
  res.status(201).json(habit);
};

// Delete habit
export const deleteHabit = async (req, res) => {
  const { id } = req.params;
  const habit = await Habit.findByPk(id);
  if (!habit) return res.status(404).json({ message: "Habit not found" });

  await habit.destroy();
  res.json({ message: "Habit deleted" });
};