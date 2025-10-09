import User from "./User.js";
import Habit from "./Habit.js";
import Schedule from "./Schedule.js";
import Progress from "./Progress.js";
import Achievement from "./Achievement.js";
import UserAchievement from "./UserAchievement.js";
import Friend from "./Friend.js";
import GroupChallenge from "./GroupChallenge.js";
import UserGroupChallenge from "./UserGroupChallenge.js";
import Notification from "./Notification.js";

// User → Habits
User.hasMany(Habit, { foreignKey: "user_id" });
Habit.belongsTo(User, { foreignKey: "user_id" });

// Habit → Schedules
Habit.hasMany(Schedule, { foreignKey: "habit_id" });
Schedule.belongsTo(Habit, { foreignKey: "habit_id" });

// User → Progress
User.hasMany(Progress, { foreignKey: "user_id" });
Progress.belongsTo(User, { foreignKey: "user_id" });

// Habit → Progress
Habit.hasMany(Progress, { foreignKey: "habit_id" });
Progress.belongsTo(Habit, { foreignKey: "habit_id" });
console.log("✅ Habit ↔ Progress association registered");

// Achievements
User.belongsToMany(Achievement, { through: UserAchievement, foreignKey: "user_id" });
Achievement.belongsToMany(User, { through: UserAchievement, foreignKey: "achievement_id" });

// Friends (self-reference)
User.belongsToMany(User, {
  through: Friend,
  as: "Friends",
  foreignKey: "user_id",
  otherKey: "friend_id"
});

// Group Challenges
User.belongsToMany(GroupChallenge, { through: UserGroupChallenge, foreignKey: "user_id" });
GroupChallenge.belongsToMany(User, { through: UserGroupChallenge, foreignKey: "challenge_id" });

// Notifications
User.hasMany(Notification, { foreignKey: "user_id" });
Notification.belongsTo(User, { foreignKey: "user_id" });

export {
  User,
  Habit,
  Schedule,
  Progress,
  Achievement,
  UserAchievement,
  Friend,
  GroupChallenge,
  UserGroupChallenge,
  Notification
};