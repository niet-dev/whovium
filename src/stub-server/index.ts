import { createJsonServer } from "./server";

const SERVER_PORT = 8080;

const server = createJsonServer();

server.listen(SERVER_PORT, () => {
  console.log(`JSON server is running on port ${8080}`);
});
