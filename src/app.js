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

app.use("/api", apiRoutes)