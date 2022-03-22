// Third party
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Custom
const Post = require("../models/post-model");
const User = require("../models/user-model");

// Create a Post. Privileged, requires authorization
const createPost = async (req, res, next) => {
  console.log("request.userData added by authorization module"); // test
  console.log(req.userData); // test
  // Middleware registered in the routes gets invoked here
  // If returned errors object isn't empty, error is passed down the chain via next()
  // THIS TRY-CATCH ENSURES PROCESSING OF INPUT PROPERTIES
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new Error("Invalid inputs entered. Post content can not be empty"));
  }

  // user will be added through Postman for now. Later, auth will carry req.userId
  const { title, content, user } = req.body;
  const createdPost = new Post({
    title,
    content,
    user,
    date: new Date().toISOString(),
    reactions: {
      thumbsUp: 0,
      thumbsDown: 0,
      heart: 0,
      hooray: 0,
    },
  });
  // This block ensures that only existing user can create a new post
  let existingUser;
  try {
    existingUser = await User.findById(user);
    if (!existingUser) {
      return next(new Error("Creating Post failed. Corresponding User not found"));
    }
  } catch (error) {
    return next(new Error(`Creating Post failed: ${error.message}`));
  }

  // Once found, we make sure (here, on backend) that ONLY whomever token belongs to
  // MAY create a new post!
  if (existingUser._id.toString() !== req.userData.userId) {
    // existingUser._id --> WHO THIS POST WILL BELONG TO
    // req.userData.userId --> WHO IS CURRENTLY LOGGED IN
    return next(new Error(`You are not authorized to perform this task!`));
  }

  // THIS TRY-CATCH ENSURES PROPER NETWORK PROTOCOL EXCHANGE
  try {
    // Transactions let you execute multiple operations
    // In isolation and potentially undo all the operations if one of them fails.
    const session = await mongoose.startSession();
    // Begin Transaction
    session.startTransaction();
    await createdPost.save({ session: session });
    existingUser.posts.push(createdPost); // This push method is unique to mongoose. Adds placeId to user
    await existingUser.save({ session: session });
    await session.commitTransaction();
    // End Transaction
    res.status(201).json({ post: createdPost });
  } catch (error) {
    return next(new Error(`Creating Post failed: ${error.message}`));
  }
};

// Update a Post. Privileged, requires authorization
const updatePost = async (req, res, next) => {
  console.log("request.userData added by authorization module"); // test
  console.log(req.userData); // test
  // Middleware registered in the routes gets invoked here
  // If returned errors object isn't empty, error is passed down the chain via next()
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new Error("Invalid inputs entered. Post content can not be empty"));
  }

  const postId = req.params.postId;
  const { title, content } = req.body;

  let updatedPost;
  try {
    updatedPost = await Post.findById(postId);
    // Checking if we can find the place
    if (!updatedPost) {
      return next(new Error("Updating Post failed. Corresponding Post not found"));
    }

    // Once found, we make sure (here, on backend) that ONLY whomever token belongs to
    // MAY update a post as well!
    if (updatedPost.user.toString() !== req.userData.userId) {
      // existingUser._id --> WHO THIS POST WILL BELONG TO
      // req.userData.userId --> WHO IS CURRENTLY LOGGED IN
      return next(new Error(`You are not authorized to perform this task!`));
    }

    // Once verified, we allow the editing to proceed
    updatedPost = await Post.findByIdAndUpdate(postId, { title, content }, { new: true });

    res.status(200).json({ post: updatedPost });
  } catch (error) {
    return next(new Error(`Updating Post failed: ${error.message}`));
  }
};

// List All Posts
const listAllPosts = async (req, res, next) => {
  try {
    let posts = await Post.find({}).populate("user");
    if (posts.length === 0) {
      res.status(200).json({ posts: "Nothing posted at this time" });
    }

    res.status(200).json({ posts: posts });
  } catch (error) {
    return next(new Error(`Fetching posts failed: ${error.message}`));
  }
};

// Delete a Post
const deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  let deletedPost;
  try {
    // Makes full User object available via Place
    deletedPost = await Post.findById(postId).populate("user");
    if (!deletedPost) {
      return next(new Error(`Post could not be found`));
    }
    // Once found, we make sure (here, on backend) that ONLY whomever created This
    // Place MAY delete it as well! NOTE: since 'creator' is populated, it's
    // displayed a full object with all the User props for creator. Hence,
    // we first go to _id prop and then convert it to string!
    if (deletedPost.user._id.toString() !== req.userData.userId) {
      return next(new Error(`You are not authorized to delete this place!`));
    }

    const session = await mongoose.startSession();
    // Begin Transaction
    session.startTransaction();
    await deletedPost.remove({ session: session });
    deletedPost.user.posts.pull(deletedPost); // This pull method is unique to mongoose. Removes postId from user
    await deletedPost.user.save({ session: session });
    await session.commitTransaction();
    // End Transaction

    res.status(200).json({ post: deletedPost });
  } catch (error) {
    return next(new Error(`Deleting Post failed: ${error.message}`));
  }
};

// MORE TO BE ADDED...

exports.createPost = createPost;
exports.updatePost = updatePost;
exports.listAllPosts = listAllPosts;
exports.deletePost = deletePost;
