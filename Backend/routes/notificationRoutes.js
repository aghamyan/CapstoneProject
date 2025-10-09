import express from "express";
import { Notification } from "../models/index.js";

const router = express.Router();

// Get notifications
router.get("/:userId", async (req, res) => {
  try {
    const notifications = await Notification.findAll({ where: { user_id: req.params.userId } });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// Add notification
router.post("/", async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: "Failed to create notification" });
  }
});

export default router;