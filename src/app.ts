import express from "express";
import empresasRouter from "./routes/empresaRoutes";

const app = express();

app.use(express.json());
app.use('/empresas', empresasRouter);

export default app;
