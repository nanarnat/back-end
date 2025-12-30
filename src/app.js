import express from "express";
import cors from "cors";
import {router as apiRoutes} from "./routes/index.js";

export const app = express();

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://front-end-lovat-ten.vercel.app",
    ],
}

app.use(cors(corsOptions));

app.use(express.json())

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