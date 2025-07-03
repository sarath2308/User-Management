import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from './routes/router.js'
import adminRouter from './routes/adminRoutes.js'
import adminController from './controllers/adminController.js';
import { verifyAdminToken } from './middleware/adminAuth.js';
dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/',userRouter)
app.use('/api/admin',adminRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
