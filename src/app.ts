import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const { PORT } = process.env || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
