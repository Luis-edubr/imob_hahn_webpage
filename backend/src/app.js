import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./router.js";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(router);

export default app;