import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// 🔓 públicas
router.post("/register", register);
router.post("/login", login);

// 🔒 protegida
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Perfil del usuario",
    user: req.user,
  });
});

export default router;