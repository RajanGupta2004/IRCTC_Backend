import config from "../config/config";
import RedisClient from "../config/redis";
import { AppError } from "./AppError";
import otpGenerator from "otp-generator";
import crypto from "crypto";

const redis = RedisClient.getInstance();

const RATE_MAX = config.OTP_MAX_COUNT_LIMIT;

export const generateAndStoreOtp = async (meta: any) => {
  const limitKey = `otp_limit:${meta.email}`;

  const sentCount = await redis.get(limitKey);
  const OTP_TTL = Number(config.OTP_TTL);

  if (sentCount && Number(sentCount) >= Number(RATE_MAX)) {
    throw new AppError("Too many OTP requests. Try again later.", 429);
  }

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  const sessionId = crypto.randomUUID();
  // Hash OTP
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  // Store Payload
  const payload = {
    otp: hashedOtp,
    email: meta.email,
    firstName: meta.firstName,
    lastName: meta.lastName,
  };

  const otpKey = `otp:session:${sessionId}`;
  await redis.set(otpKey, JSON.stringify(payload), "EX", OTP_TTL);

  // Increment Rate Limit Counter
  const count = await redis.incr(limitKey);

  // Set Expiry for Rate Limit
  if (count === 1) {
    await redis.expire(limitKey, 60 * 60); // 1 hour
  }

  return {
    otp,
    sessionId,
  };
};
