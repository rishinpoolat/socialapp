const { Post, Like, Comment, User } = require("../models/config");
// add post
async function addPost(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    req.on("data", (chunk) => {
      const progress = chunk.toString();
      console.log(`Progress: ${progress}`);
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image." });
    }
    console.log(req.file);
    const media = req.file.filename;
    const body = req.body.caption;
    if (typeof body !== "string") {
      return res.status(400).json({ message: "caption should be string" });
    }
    await Post.create({
      body,
      media,
      userId,
    });
    console.log("Post added successfully");
    return res.status(201).json({ message: "post added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
// addlike

async function addLike(req, res) {
  try {
    const userId = req.params.id;
    const { postId } = req.body;
    const postIdAsInt = parseInt(postId, 10);
    const user = await User.findByPk(userId);
    const post = await Post.findByPk(postId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    if (!userId || !postId) {
      return res.status(400).json({ message: "more details required" });
    }
    if (Number.isNaN(postIdAsInt)) {
      return res.status(400).json({ message: "postId must be an integer" });
    }
    const newLike = await Like.create({
      userId,
      postId: postIdAsInt,
    });
    return res.status(201).json(newLike);
  } catch (error) {
    console.log(error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ message: "This like already exists for the post." });
    }
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
// delete a post
async function deletePost(req, res) {
  try {
    const { postId } = req.params;
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      console.log("no user");
      return res.status(404).json({ message: "User not found" });
    }

    if (!postId) {
      console.log("no postId");
      return res.status(400).json({ message: "more details required" });
    }
    const postIdAsInt = parseInt(postId, 10);
    if (Number.isNaN(postIdAsInt)) {
      return res.status(400).json({ message: "postId must be an integer" });
    }
    const post = await Post.findByPk(postIdAsInt);
    if (!post) {
      console.log("Post not found.");
      return res.status(404).json({ message: "Post not found" });
    }
    await post.destroy();
    console.log("Post deleted successfully.");
    return res.status(200).json({ message: "post deleted" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
// add comment
async function addComment(req, res) {
  try {
    const { postId, content } = req.body;
    const userId = req.params.id;
    const postIdAsInt = parseInt(postId, 10);
    const user = await User.findByPk(userId);
    const post = await Post.findByPk(postId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    if (!userId || !postId || !content) {
      return res.status(400).json({ message: "more details required" });
    }
    if (Number.isNaN(postIdAsInt)) {
      return res.status(400).json({ message: "postId must be an integer" });
    }
    if (typeof content !== "string") {
      return res.status(400).json({ message: "caption should be string" });
    }

    Comment.create({
      userId,
      postId: postIdAsInt,
      content,
    });
    console.log("comment added successfully");
    return res.status(201).json({ message: "commented" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
// remove like
async function removeLike(req, res) {
  try {
    const { postId } = req.params;
    const postIdAsInt = parseInt(postId, 10);
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    const post = await Post.findByPk(postId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    if (!userId || !postId) {
      return res.status(400).json({ message: "more details required" });
    }
    if (Number.isNaN(postIdAsInt)) {
      return res.status(400).json({ message: "postId must be an integer" });
    }
    await Like.destroy({
      where: {
        userId,
        postId: postIdAsInt,
      },
    });
    return res.status(200).json({ message: "unliked" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = {
  addPost,
  addLike,
  addComment,
  deletePost,
  removeLike,
};
