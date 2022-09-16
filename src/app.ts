import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index";
import handleErrorsMiddleware from "./middlewares/handleErrorsMiddleware";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(handleErrorsMiddleware);

export default app;
