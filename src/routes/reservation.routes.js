import express from "express";
import {
  create,
  getAll,
} from "../controllers/reservation.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, create);
router.get("/", authMiddleware, getAll);

export default router;