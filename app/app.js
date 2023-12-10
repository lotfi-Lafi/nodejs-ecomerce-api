import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/usersRoute.js';
import { globalErrHandler, notFound } from '../middlewares/globalErrHandler.js';


// connect to DB
dbConnect();


const app = express();

// pass incoming data
app.use(express.json());

// routes
app.use('/api/v1/users/', userRoutes);

// error Middleware
app.use(notFound); // url 404 not found
app.use(globalErrHandler);

export default app;
