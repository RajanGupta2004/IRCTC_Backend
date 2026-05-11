import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import logger from "./config/logger";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  logger.info("server  is running fine");
  res.status(200).json({
    message: "user service is running fine",
  });
});

app.use(errorHandler);
export default app;
