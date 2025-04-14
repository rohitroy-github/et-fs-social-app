import express from "express";
import { handleProfileInformation } from "../controllers/instagramController.js";

const router = express.Router();

router.get("/profile", handleProfileInformation);

export default router;
