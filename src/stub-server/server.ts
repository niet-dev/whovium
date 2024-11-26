import jsonServer from "json-server";

import { seedBoards } from "./seed";

export const createJsonServer = () => {
  const server = jsonServer.create();
  const router = jsonServer.router("src/stub-server/db.json");
  const middlewares = jsonServer.defaults();

  server.use(middlewares);

  server.use("/", (req, res, next) => {
    if (req.method === "DELETE" && req.query["_cleanup"]) {
      const db = router.db;
      db.set("boards", []).write();
      res.sendStatus(204);
    } else {
      next();
    }
  });

  server.use("/", (req, res, next) => {
    if (req.method === "GET" && req.query["_seed"]) {
      const db = router.db;
      db.set("boards", seedBoards(100)).write();
      res.sendStatus(201);
    } else {
      next();
    }
  });

  server.use("/", function (req, res, next) {
    if (req.method === "GET") {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  server.use(router);

  return server;
};
