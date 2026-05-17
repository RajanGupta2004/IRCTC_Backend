import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";
import bcrypt from "bcrypt";
import { generateAndStoreOtp } from "../utils/otp";
import { sendOtpEmail } from "../utils/email";
import logger from "../config/logger";

interface sendOtpDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export const sendOtp = async (dto: sendOtpDto) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new AppError("user already exist", 400);
    }
    logger.info("user already exist");
    const salt = 10;
    const hasedPassword = await bcrypt.hash(dto.password, salt);
    const meta = {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: hasedPassword,
    };

    const { otp, sessionId } = await generateAndStoreOtp(meta);
    await sendOtpEmail(dto.email, otp);
    return sessionId;
  } catch (error: any) {
    console.log("Error", error);
    throw new Error(error);
  }
};
