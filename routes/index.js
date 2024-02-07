const express = require("express");
const { requireUser } = require("../middlewares/authMiddleware");
const {
	getFollowingPostsAndCounts,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", requireUser, getFollowingPostsAndCounts);

module.exports = router;
