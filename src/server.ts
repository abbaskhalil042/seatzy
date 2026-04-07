import express from "express";
import { serverConfig } from "./config/index.js";
import apiRoutes from "./routes/index.js";


console.log(serverConfig);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(serverConfig.PORT,async () => {
  console.log("server is running");

  

});
