/* eslint-disable no-shadow */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const validator = require("validator");
const { Op } = require("sequelize");
const speakeasy = require("speakeasy");
const {
  User,
  Follow,
  Post,
  Like,
  Comment,
  Notification,
} = require("../models/config");

const maxAge = 8 * 24 * 60 * 60;
async function createToken(user) {
  const payload = { name: user.name, userId: user.id };
  return jwt.sign(payload, process.env.SECRET, {
    expiresIn: maxAge,
  });
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
// generate otp function
function generateOTP() {
  const secret = speakeasy.generateSecret({ step: 600 }).base32;
  console.log(secret);
  return secret;
}

// add new user
async function addUser(req, res) {
  try {
    const { name, email, password, confirmPassword } = req.body;

    console.log(typeof name);

    if (!email || !name || !password || !confirmPassword) {
      return res.status(400).json({ message: "please complete all details" });
    }
    if (typeof name !== "string") {
      return res.status(400).json({ message: "name should be string" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "email format is incorrect" });
    }
    const existingUserWithName = await User.findOne({ where: { name } });
    if (existingUserWithName) {
      return res.status(400).json({
        message: "User with this name already exists. try some other name",
      });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists try login" });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "password should have 8 length  1 uppercase and 1 loxercase and 1 digit",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password doesnt match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!email || !password || !name) {
      return res.status(400).json({ message: "more details required" });
    }
    const otpSecret = generateOTP();

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      otpSecret,
    });

    // sending varification mail
    const token = speakeasy.totp({
      secret: otpSecret,
      step: 600,
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: newUser.email,
      subject: "OTP Verification",
      text: `Your OTP for verification: ${token}`,
    };
    console.log("here");
    await transporter.sendMail(mailOptions);
    console.log("there");
    return res
      .status(201)
      .json({ userId: newUser.id, message: "otp is send to your email" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
// render verify otp page
async function renderVerifyOtp(req, res) {
  try {
    const userId = req.params.id;
    console.log(userId);
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.render("verifyOtp", { userId: user.id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
// function for varifying otp
async function verifyOtp(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }
    if (typeof otp !== "string") {
      return res.status(400).json({ message: "Invalid OTP  data type" });
    }

    const otpValidates = speakeasy.totp.verify({
      secret: user.otpSecret,
      token: otp,
      step: 600,
    });
    console.log(otpValidates);

    if (otpValidates) {
      // OTP is valid, mark user as verified
      await user.update({ isOtpVerified: true });

      console.log("user added successfully");
      const token = await createToken(user);
      res.cookie("jwt", token, { httpOnly: true, expiresIn: maxAge * 1000 });
      return res.status(200).json({ message: "signup successful" });
    }
    // OTP is invalid, delete the user and send an error response

    return res.status(400).json({ message: "failed MFA. try login" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
// login user
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "please enter all the details" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "incorrect email format" });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (correctPassword) {
      const token = await createToken(user);
      res.cookie("jwt", token, { httpOnly: true, expiresIn: maxAge * 1000 });
      return res
        .status(200)
        .json({ success: true, message: "login successful" });
    }
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
}
// invite user
async function inviteUser(req, res) {
  try {
    const { email } = req.body;
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "incorrect email format" });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "already a member" });
    }
    // Verify and decode the token
    const { name } = req.params;

    // Create a transporter object using your email service's SMTP settings
    console.log(email);
    const message = {
      from: "socialappqb@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Invitation to SocialApp", // Subject line
      text: `${name} invited you to join SocialApp,click on http://10.7.50.81:5001/users/signup to join.`, // plain text body
    };
    transporter.sendMail(message);
    return res.status(200).json({ message: "invitation sent" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "failed to send" });
  }
}
// add follower
async function addfollows(req, res) {
  try {
    const followerId = req.params.id;
    const { followingId } = req.body;
    if (!followerId || !followingId) {
      return res.status(400).json({ message: "more details required" });
    }
    await Follow.create({
      followerId,
      followingId,
    });
    console.log("Follow added successfully");
    return res.status(201).json({ message: "follow successful" });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      // Handle the unique constraint violation error
      return res
        .status(400)
        .json({ message: "This follow relationship already exists." });
    }
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
// remove follower
async function removeFollows(req, res) {
  try {
    const followerId = req.params.id;
    const { followingId } = req.params;
    console.log(followingId);
    await Follow.destroy({
      where: {
        followerId,
        followingId,
      },
    });
    return res.status(200).json({ message: "error in unfollowing" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function getFollowingPostsAndCounts(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    const userName = user.name;

    if (!user) {
      console.error("User not found.");
      return res.status(404).json({ error: "User not found." });
    }

    const notificationCount = await Notification.count({
      where: { userId, isRead: false },
    });

    const postsPerPage = 9;
    const page = parseInt(req.query.page, 10) || 1;
    const followingUsersData = await Follow.findAll({
      where: { followerId: userId },
      attributes: ["followingId"],
    });

    const followingUserIds = followingUsersData.map(
      (follow) => follow.followingId
    );

    const followingUserPosts = await Post.findAll({
      where: { userId: followingUserIds },
      attributes: ["id", "userId", "body", "media"],
      limit: postsPerPage,
      offset: (page - 1) * postsPerPage,
    });

    const result = await Promise.all(
      followingUserPosts.map(async (post) => {
        const likeCount = await Like.count({ where: { postId: post.id } });
        const postUser = await User.findByPk(post.userId);
        const postUserName = postUser ? postUser.name : null;
        const liked = await Like.findOne({
          where: { postId: post.id, userId },
        });

        const comments = await Comment.findAll({
          where: { postId: post.id },
          include: [{ model: User, attributes: ["name"] }],
          attributes: ["content"],
        });

        return {
          userId: post.userId,
          postId: post.id,
          body: post.body,
          media: post.media,
          likeCount,
          commentCount: comments.length,
          userName: postUserName,
          liked: !!liked,
          comments: comments.map((comment) => ({
            userName: comment.User.name,
            content: comment.content,
          })),
        };
      })
    );

    const posts = result.flat(); // Flatten the array

    return res.render("home.ejs", {
      posts,
      userId,
      userName,
      notificationCount,
      page,
      postsPerPage,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
// profile details
async function getUserDetails(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      console.error("User not found.");
      return res.status(404).json({ error: "User not found." });
    }
    // Count of Posts
    const postCount = await Post.count({ where: { userId } });
    // Count of Followers
    const followerCount = await Follow.count({
      where: { followingId: userId },
    });
    // Count of Followings
    const followingCount = await Follow.count({
      where: { followerId: userId },
    });
    // Retrieve all post details of the user, including ID
    const userPosts = await Post.findAll({
      where: { userId },
      attributes: ["id", "body", "media"],
    });
    // Fetch the count of likes and comments for each post
    const postDetails = await Promise.all(
      userPosts.map(async (post) => {
        const likeCount = await Like.count({ where: { postId: post.id } });
        const liked = await Like.findOne({
          where: { postId: post.id, userId },
        });
        const comments = await Comment.findAll({
          where: { postId: post.id },
          attributes: ["id", "content"],
          include: [
            {
              model: User,
              attributes: ["name"], // Include the username of the comment author
            },
          ],
        });

        return {
          id: post.id,
          body: post.body,
          media: post.media,
          likeCount,
          liked: !!liked,
          commentCount: comments.length,
          comments: comments.map((comment) => ({
            id: comment.id,
            content: comment.content,
            userName: comment.User.name, // Get the username of the comment author
          })),
        };
      })
    );

    // Construct the result object
    const userDetails = {
      id: user.id,
      name: user.name,
      email: user.email,
      postCount,
      followerCount,
      followingCount,
      posts: postDetails,
    };

    return res.render("profile.ejs", { details: userDetails, userId });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
async function searchUsers(req, res) {
  try {
    const { searchUser } = req.body;
    console.log(searchUser);
    // Verify and decode the token
    const userId = req.params.id;
    const users = await User.findAll({
      where: {
        name: {
          [Op.iLike]: `%${searchUser}%`,
        },
      },
      attributes: ["id", "name"],
    });
    console.log(users);
    const usersWithFollowInfo = await Promise.all(
      users.map(async (user) => {
        const isFollowing = await Follow.findOne({
          where: {
            followerId: userId,
            followingId: user.id,
          },
        });
        return {
          id: user.id,
          name: user.name,
          isFollowing: !!isFollowing,
        };
      })
    );
    console.log(usersWithFollowInfo);
    return res.render("search.ejs", { details: usersWithFollowInfo, userId });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
// forgot password
async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    console.log(email);
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "incorrect email format" });
    }

    // create one time link that exist for 10 minutes
    const payload = { email };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "15m" });
    const link = `http://10.7.50.81:5001/users/resetPassword/${token}`;

    const message = {
      from: "socialappqb@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Reset Password link", // Subject line
      text: `click to reset passwrod ${link}, link is only valid for 15 minutes `, // plain text body
    };
    transporter.sendMail(message);
    return res.status(200).json({ message: "reset link sent to email" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function resetPassword(req, res) {
  try {
    const { token } = req.params;

    const decodedToken = jwt.verify(token, process.env.SECRET);
    const { email } = decodedToken;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "user doesnt exist. try signup" });
    }

    return res.render("reset.ejs", {
      email: decodedToken.email,
      token,
      id: user.id,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
// reset password functionality
async function resetFunction(req, res) {
  try {
    const { token } = req.params;
    console.log(token);
    console.log("this is the token");
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const { email } = decodedToken;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "user doesnt exist. try signup" });
    }
    const { password, confirmPassword } = req.body;
    console.log(confirmPassword);
    if (!password || !confirmPassword) {
      return res.status(400).json({ message: "please complete all details" });
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "password should have 8 length  1 uppercase and 1 loxercase and 1 digit",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password doesnt match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    return res.status(201).json({ message: "password reset successful" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
// for explore page
async function getUnfollowedUsers(req, res) {
  try {
    const userId = req.params.id;
    console.log(userId);
    const user = await User.findByPk(userId);
    if (!user) {
      console.error("User not found.");
      return res.status(404).json({ message: "User not found." });
    }
    const followingUsers = await user.getFollowings();
    const followingIds = followingUsers.map(
      (followingUser) => followingUser.id
    );
    // Find all users and filter out the ones that are not in the list of followingIds
    const allUsers = await User.findAll({
      attributes: ["id", "name"],
    });
    const unfollowedUsers = allUsers
      .filter((unfollow) => !followingIds.includes(unfollow.id))
      .filter((curruser) => curruser.id !== userId); // Remove the current user's ID
    // Extract the IDs and names of unfollowed users
    const unfollowedUserDetails = unfollowedUsers.map((unfollowedUser) => ({
      id: unfollowedUser.id,
      name: unfollowedUser.name,
    }));
    return res.render("explore.ejs", {
      details: unfollowedUserDetails,
      userId,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function getFollowings(req, res) {
  try {
    const userId = req.params.id;
    console.log(userId);
    const followEntries = await Follow.findAll({
      where: { followerId: userId },
      attributes: ["followingId"], // Only retrieve the followerId
    });
    const results = await Promise.all(
      // eslint-disable-next-line consistent-return
      followEntries.map(async (entry) => {
        const { followingId } = entry;

        // Find the corresponding User record based on followerId
        const followingUser = await User.findOne({
          where: { id: followingId },
          attributes: ["id", "name"], // Only retrieve the id and name
        });

        if (followingUser) {
          return {
            id: followingUser.id,
            name: followingUser.name,
          };
        }
      })
    );
    console.log(results);
    return res.render("followings.ejs", { details: results, userId });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
async function getFollowers(req, res) {
  try {
    const userId = req.params.id;
    const followEntries = await Follow.findAll({
      where: { followingId: userId },
      attributes: ["followerId"], // Only retrieve the followerId
    });
    const results = await Promise.all(
      // eslint-disable-next-line consistent-return
      followEntries.map(async (entry) => {
        const { followerId } = entry;

        // Find the corresponding User record based on followerId
        const followingUser = await User.findOne({
          where: { id: followerId },
          attributes: ["id", "name"], // Only retrieve the id and name
        });

        if (followingUser) {
          // Check if the follower follows the user back
          const isFollowingBack = await Follow.findOne({
            where: { followingId: followerId, followerId: userId },
          });

          return {
            id: followingUser.id,
            name: followingUser.name,
            isFollowingBack: !!isFollowingBack, // Convert to boolean
          };
        }
      })
    );
    return res.render("followers.ejs", { details: results, userId });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
// logout user
async function logOutUser(req, res) {
  res.cookie("jwt", "", { maxAge: 1 });
  return res.redirect("/");
}
module.exports = {
  addUser,
  loginUser,
  addfollows,
  getFollowingPostsAndCounts,
  getUserDetails,
  getUnfollowedUsers,
  logOutUser,
  removeFollows,
  inviteUser,
  searchUsers,
  getFollowings,
  getFollowers,
  forgotPassword,
  resetPassword,
  resetFunction,
  renderVerifyOtp,
  verifyOtp,
};
