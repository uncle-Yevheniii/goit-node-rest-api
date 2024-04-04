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
import { nanoid } from "nanoid";
import { promises as fs } from "fs";

import {
  addContact,
  getContactById,
  listContacts,
} from "./services/contactsServices.js";

const app = express();

/**
 * middleware
 */
app.use(express.json());

/**
 * health-check
 */
app.get("/ping", (req, res) => {
  res.status(200).json({ status: "success", data: "Hello API!" });
});

/**
 * REST api
 *
 * POST         /contacts
 * GET          /contacts
 * GET          /contacts/:<userID>
 * PUT          /contacts/:<userID>
 * DELETE       /contacts/:<userID>
 */

//  * POST         /contacts
app.post("/contacts", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    // validation

    const newUser = await addContact(name, email, phone);

    res.status(201).json({
      status: "create",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
  }
});

// * GET          /contacts
app.get("/contacts", async (req, res) => {
  try {
    const allContacts = await listContacts();

    res.status(200).json({
      status: "read",
      data: allContacts,
    });
  } catch (error) {
    console.log(error);
  }
});

// * GET          /contacts/:<userID>
app.get("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // validation

    const oneContacts = await getContactById(id);

    res.status(200).json({
      status: "read",
      data: oneContacts,
    });
  } catch (error) {
    console.log(error);
  }
});
/**
 * server-init
 */
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
