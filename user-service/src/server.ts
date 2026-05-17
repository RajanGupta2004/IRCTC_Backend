import http from "http";
import app from "./app";
import { prisma } from "./config/prisma";
const server = http.createServer(app);

const PORT = 4001;
const startServer = async () => {
  try {
    await prisma.$connect();

    console.log("✅ DB Connected Successfully");

    server.listen(PORT, () => {
      console.log(`🚀 User server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("❌ DB Connection Failed");
    console.error(error);
  }
};

startServer();
