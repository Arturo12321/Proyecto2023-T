import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import authRoutes from "./routes/auth.routes.js";
import carRoutes from "./routes/cars.routes.js";


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}

));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
const publicFolderPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(publicFolderPath));
app.use('/api', authRoutes);
app.use('/api', carRoutes);
export default app;