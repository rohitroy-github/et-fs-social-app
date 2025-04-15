import express from "express";
import { fetchUserPosts, fetchUserProfileInformation } from "../controllers/instagramController.js";

const router = express.Router();

router.get("/profile", fetchUserProfileInformation);
router.get("/posts", fetchUserPosts);

export default router;
