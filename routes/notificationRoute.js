const express = require("express");
const {
	addNotification,
	getNotifications,
	updateNotifications,
} = require("../controllers/notificationController");
const { requireUser } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/add", requireUser, addNotification);
router.get("/all", requireUser, getNotifications);
router.put("/all", requireUser, updateNotifications);

module.exports = router;
