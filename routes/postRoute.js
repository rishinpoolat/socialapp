const express = require("express");
const progress = require("progress-stream");
const {
  addPost,
  addLike,
  addComment,
  deletePost,
  removeLike,
} = require("../controllers/postController");
const { requireUser } = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/multerMiddleware");

function progress_middleware(req, res, next) {
  const p = progress();
  req.pipe(p);
  p.headers = req.headers;

  p.on("progress", (progress) => {
    const percentage = progress.percentage;
    res.write(`${Math.floor(percentage)}%`); // send progress update to client
  });

  upload(p, res, next);
}
const router = express.Router();
router.post("/addpost", requireUser, progress_middleware, addPost);
router.post("/addlike", requireUser, addLike);
router.post("/addcomment", requireUser, addComment);
router.get("/addpost", requireUser, (req, res) => res.render("addPost.ejs"));
router.delete("/removelike/:postId", requireUser, removeLike);
router.delete("/:postId", requireUser, deletePost);

module.exports = router;
