import express from "express";
import {
  create,
  getMine,
} from "../controllers/restaurant.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, create);
router.get("/me", authMiddleware, getMine);

export default router;