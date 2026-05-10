import dotenv from "dotenv";

dotenv.config();

export default {
  SERVICE_NAME: "User service",
  PORT: process.env.PORT || 4001,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  REDIS_URL: process.env.REDIS_URL,
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};
