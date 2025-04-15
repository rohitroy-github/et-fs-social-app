import express from "express";
import { fetchPostComments, fetchUserPosts, fetchUserProfileInformation, handleCommentReply } from "../controllers/IG_ProfileController.js";

const router = express.Router();

router.get("/profile", fetchUserProfileInformation);
router.get("/posts", fetchUserPosts);
router.get("/post/comment", fetchPostComments);
router.get("/post/comment/reply", handleCommentReply);

export default router;
