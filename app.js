// import express from "express";
// import morgan from "morgan";
// import cors from "cors";

// import contactsRouter from "./routes/contactsRouter.js";

// const app = express();

// app.use(morgan("tiny"));
// app.use(cors());
// app.use(express.json());

// app.use("/api/contacts", contactsRouter);

// app.use((_, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// app.use((err, req, res, next) => {
//   const { status = 500, message = "Server error" } = err;
//   res.status(status).json({ message });
// });

// app.listen(3000, () => {
//   console.log("Server is running. Use our API on port: 3000");
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import { router as contactsRouter } from "./routes/contactsRouter.js";
import { errorGlobalHandler } from "./controllers/errorControllers.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
/**
 * middleware
 */
app.use(express.json());

/**
 * routes
 */
const pathPrefix = "/api";
app.use(`${pathPrefix}/contacts`, contactsRouter);
// not-found-route
app.all("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorGlobalHandler);

/**
 * server-init
 */
const port = Number(process.env.PORT);
app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
