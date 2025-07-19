import express from "express";
import empresasRouter from "./routes/empresaRoutes";
import dotenv from 'dotenv';

const app = express();

dotenv.config();
app.use(express.json());

app.use('/empresa', empresasRouter);

export default app;
