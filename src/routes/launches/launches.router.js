const express = require("express");
const launchesRouter = express.Router();

const {
  httpGetAllLaunches,
  httpCreateLaunche,
  httpAbortLaunche,
} = require("./launches.controller");

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpCreateLaunche);
launchesRouter.delete("/:id", httpAbortLaunche);

module.exports = launchesRouter;
