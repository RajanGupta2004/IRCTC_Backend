import dotenv from "dotenv";

dotenv.config();

export default {
  SERVICE_NAME: "User service",
  PORT: process.env.PORT || 4001,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  REDIS_URL: process.env.REDIS_URL,
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
  OTP_TTL: process.env.OTP_TTL || 600,
  OTP_MAX_COUNT_LIMIT: Number(process.env.OTP_MAX_COUNT_LIMIT) || 5,
};
