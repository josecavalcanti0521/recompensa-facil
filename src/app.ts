import express from "express";
import empresasRouter from "./routes/empresaRoutes";
import dotenv from 'dotenv';
import usersRouter from "./routes/userRoutes";

const app = express();

dotenv.config();
app.use(express.json());
app.use('/empresa', empresasRouter);
app.use('/users', usersRouter);

export default app;
