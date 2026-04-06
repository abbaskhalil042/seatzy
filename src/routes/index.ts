import e, { Router } from "express";
import v1Route from "./v1/index.js";

const apiRoutes = Router();

apiRoutes.use("/v1", v1Route);

export default apiRoutes;
