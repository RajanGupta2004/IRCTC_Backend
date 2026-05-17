import express from "express";
import * as authController from "../controllers/auth.controller";
const router = express.Router();

router.post("/auth/send-otp", authController.sendOTP);

export default router;
