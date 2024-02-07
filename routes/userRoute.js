const express = require("express");
const {
	addUser,
	loginUser,
	inviteUser,
	addfollows,
	getFollowingPostsAndCounts,
	getUserDetails,
	getUnfollowedUsers,
	logOutUser,
	removeFollows,
	searchUsers,
	getFollowings,
	getFollowers,
	forgotPassword,
	resetPassword,
	resetFunction,
	renderVerifyOtp,
	verifyOtp,
} = require("../controllers/userController");
const { requireUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/login", (req, res) => res.render("login.ejs"));
router.get("/signup", (req, res) => res.render("signup.ejs"));
router.get("/profile", requireUser, getUserDetails);
router.post("/search", requireUser, searchUsers);
router.get("/followings", requireUser, getFollowings);
router.get("/followers", requireUser, getFollowers);
router.get("/explore", requireUser, getUnfollowedUsers);
router.get("/", requireUser, getFollowingPostsAndCounts);
router.get("/logout", requireUser, logOutUser);

router.get("/verifyOtp/:id", renderVerifyOtp);
router.post("/verifyOtp/:id", verifyOtp);
router.post("/signup", addUser);
router.post("/login", loginUser);
router.post("/addfollows", requireUser, addfollows);
router.post("/invite", requireUser, inviteUser);

router.get("/forgotPassword", (req, res) => res.render("forgot.ejs"));
router.post("/forgotPassword", forgotPassword);

router.get("/resetPassword/:token", resetPassword);
router.post("/resetPassword/:token", resetFunction);

router.delete("/removefollows/:followingId", requireUser, removeFollows);


module.exports = router;
