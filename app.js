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
  removeContact,
} from "./services/contactsServices.js";

const app = express();

/**
 * middleware
 */
app.use(express.json());
app.use("/contacts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getContactById(id);
    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
});

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
app.get("/contacts/:id", (req, res) => {
  const { user } = req;

  res.status(200).json({
    status: "read",
    data: user,
  });
});

// * DELETE       /contacts/:<userID>
app.delete("/contacts/:id", async (req, res) => {
  try {
    const { user } = req;
    const deleteUser = await removeContact(user);

    res.status(200).json({
      status: "deleted",
      data: deleteUser,
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
