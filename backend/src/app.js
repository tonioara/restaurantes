import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
//
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import restaurantRoutes from "./routes/restaurant.routes.js";
import tableRoutes from "./routes/table.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";



dotenv.config();
///
connectDB();
const app = express();




app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
///
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/reservations", reservationRoutes);

////
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});