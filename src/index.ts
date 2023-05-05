import { config } from "dotenv";
config();
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

const port = process.env.PORT || 3000;

app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, (): void => {
      console.log(`App is listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(`Failed to connect to MongoDB: ${error}`);
  });
