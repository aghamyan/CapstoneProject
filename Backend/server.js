import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./sequelize.js";
import "./models/Associations.js";

// === Import Routes ===
import userRoutes from "./routes/userRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import groupChallengeRoutes from "./routes/groupChallengeRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// === Middlewares ===
app.use(cors());
app.use(express.json());

// === Base Health Route ===
app.get("/", (req, res) => {
  res.send("✅ StepHabit Backend is Running...");
});

// === API Routes ===
app.use("/api/users", userRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/group-challenges", groupChallengeRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/library", libraryRoutes);

// === Global Error Handler ===
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// === Connect Database ===
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    await sequelize.sync();

    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
};

connectDB();
