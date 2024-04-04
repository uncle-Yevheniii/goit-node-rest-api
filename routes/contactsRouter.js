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

import {
  createContact,
  deleteContact,
  getAllContacts,
  getOneContact,
} from "../controllers/contactsControllers.js";
import { checkUserId } from "../middleware/contactsMiddleware.js";

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

router.post("/", createContact);
router.get("/", getAllContacts);
router.get("/:id", checkUserId, getOneContact);
router.delete("/:id", checkUserId, deleteContact);

export { router };
