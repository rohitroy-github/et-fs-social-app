import express from "express";
import { fetchUserProfileInformation } from "../controllers/instagramController.js";

const router = express.Router();

router.get("/profile", fetchUserProfileInformation);

export default router;
