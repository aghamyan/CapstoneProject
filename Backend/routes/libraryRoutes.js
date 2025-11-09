import express from "express";

const router = express.Router();

const curatedHabits = [
  {
    title: "Morning Stretch",
    description: "Spend five minutes stretching to wake up your body.",
    category: "Wellness",
  },
  {
    title: "Hydration Reminder",
    description: "Drink a glass of water every two hours.",
    category: "Health",
  },
  {
    title: "Reading Sprint",
    description: "Read 10 pages of a book before bed.",
    category: "Personal Growth",
  },
];

router.get("/", (req, res) => {
  res.json(curatedHabits);
});

export default router;
