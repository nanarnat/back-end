import express from "express";
import cors from "cors";
import {router as apiRoutes} from "./routes/index.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { limiter } from "./middlewares/rateLimiter.js";

export const app = express();

app.set("trust proxy", 1)
//global middleware
app.use(helmet());

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://front-end-lovat-ten.vercel.app",
    ],credentials:true,
}

app.use(cors(corsOptions));

app.use(limiter)

app.use(express.json())

app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.use("/api", apiRoutes)

//catch404
app.use((req,res,next) => {
    const error = new Error(`Not Found: ${req.method} ${req.originalUrl}`)
    error.name = "NotFoundError"
    error.status = 404
    next(error)
})

//centralized error handling middleware
app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        path: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString(),
        stack: err.stack,
    })
})