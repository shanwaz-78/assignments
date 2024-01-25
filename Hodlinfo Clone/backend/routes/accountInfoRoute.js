import { Router } from "express";
import controller from "../controllers/index.js";

const route = Router();

route.get("/", controller.tradingInfoControllers.userAccountInfo);

export default route;