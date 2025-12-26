import dotenv from "dotenv";
import Razorpay from "razorpay";
import path from "path";
import cookieParser from "cookie-parser";
dotenv.config();
import cors from "cors";
import express, { urlencoded } from "express";
import connectDB from "./DB/databaseConnection.js";
import apiRoutes from "./routes/apiRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin:"https://edu-mantra-frontend.vercel.app",
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// app.use('/uploads',express.static('uploads'))

app.use("/api", apiRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running at port http://localhost:${PORT}`);
});
