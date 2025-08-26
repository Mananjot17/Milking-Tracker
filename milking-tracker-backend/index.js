import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db/connectDB.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
