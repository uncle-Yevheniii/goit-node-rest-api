import { Router } from "express";

import {
  createContact,
  deleteContact,
  getAllContacts,
  getOneContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import {
  checkCreateContacts,
  checkUppdateContacs,
  checkUserId,
} from "../middleware/contactsMiddleware.js";

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

router.route("/").post(checkCreateContacts, createContact).get(getAllContacts);

router.use("/:id", checkUserId);
router
  .route("/:id")
  .get(getOneContact)
  .delete(deleteContact)
  .put(checkUppdateContacs, updateContact)
  .patch(checkUppdateContacs, updateContact);

export { router };
