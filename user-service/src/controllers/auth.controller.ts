import { NextFunction, Request, Response } from "express";
import logger from "../config/logger";
import { AppError } from "../utils/AppError";
import { AppResponse } from "../utils/ApiResponse";
import * as authService from "../services/auth.service";
import config from "../config/config";

export const sendOTP = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      throw new AppError("Allfield are required", 400);
    }

    if (password !== confirmPassword) {
      throw new AppError("password mismatch", 400);
    }

    const sessionId = await authService.sendOtp({
      firstName,
      lastName,
      email,
      password,
    });

    res.cookie("otp_session", sessionId, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: Number(config.OTP_TTL) * 1000,
    });
    return res.status(200).json(new AppResponse("OTP sent successfully", 200));
  } catch (error) {
    console.log("error in send opt", error);
    logger.error("eror in send otp", error);
    next(error);
  }
};
