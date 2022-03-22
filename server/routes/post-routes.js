// Third party
const express = require("express");
const { check } = require("express-validator");

// Custom modules
const postControllers = require("../controllers/post-controllers");
const authorization = require("../middleware/check-authorization");

// Initializing the router object
const router = express.Router();

// Create a Post. Privileged, requires authorization
router.post("/", authorization, [check("content").not().isEmpty()], postControllers.createPost);

// Update a Post. Privileged, requires authorization
router.patch(
  "/:postId",
  authorization,
  [check("content").not().isEmpty()],
  postControllers.updatePost
);

// List all Posts
router.get("/", postControllers.listAllPosts);

// Delete a Post. Privileged, requires authorization
router.delete("/:postId", authorization, postControllers.deletePost);
// MORE TO BE ADDED...

module.exports = router;
