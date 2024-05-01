import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";

import { router as contactsRouter } from "./routes/contactsRouter.js";
import { router as authRouter } from "./routes/authRouter.js";
import { router as viewRouter } from "./routes/viewRoouter.js";
import { errorGlobalHandler } from "./controllers/errorControllers.js";
import { errorText } from "./constants/errorText.js";

const { e404 } = errorText;

dotenv.config();

const app = express();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

/**
 * middleware
 */
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

/**
 * pug
 */
app.set("view engine", "pug");
app.set("views", "views");

/**
 * routes
 */
const pathPrefix = "/api";
app.use(`${pathPrefix}/users`, authRouter);
app.use(`${pathPrefix}/contacts`, contactsRouter);

app.use("/", viewRouter);

// not-found-route
app.all("*", (req, res) => {
  res.status(404).json({ message: e404 });
});

app.use(errorGlobalHandler);

/**
 * server-init
 */
const port = Number(process.env.PORT);
app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
