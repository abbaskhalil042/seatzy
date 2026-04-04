import express from "express";
import { serverConfig } from "./config/index.js";

console.log(serverConfig);

const app = express();

app.listen(serverConfig.PORT, () => {
  console.log("server is running");
});

