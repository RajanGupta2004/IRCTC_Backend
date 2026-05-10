import http from "http";
import app from "./app";
const server = http.createServer(app);

const PORT = 4001;

server.listen(PORT, () => {
  console.log(`User server is running on the port ${PORT}`);
});
