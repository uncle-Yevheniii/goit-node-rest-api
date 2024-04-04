// import express from "express";
// import {
//   getAllContacts,
//   getOneContact,
//   deleteContact,
//   createContact,
//   updateContact,
// } from "../controllers/contactsControllers.js";

// const contactsRouter = express.Router();

// contactsRouter.get("/", getAllContacts);

// contactsRouter.get("/:id", getOneContact);

// contactsRouter.delete("/:id", deleteContact);

// contactsRouter.post("/", createContact);

// contactsRouter.put("/:id", updateContact);

// export default contactsRouter;

import { Router } from "express";

const router = Router();

/**
 * REST api
 *
 * POST         /contacts
 * GET          /contacts
 * GET          /contacts/:<userID>
 * PUT          /contacts/:<userID>
 * DELETE       /contacts/:<userID>
 */

router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
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
router.get("/:id", (req, res) => {
  const { user } = req;

  res.status(200).json({
    status: "read",
    data: user,
  });
});
router.delete("/:id", async (req, res) => {
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
