import { Router } from "express";

import { createContact } from "../controllers/contactsControllers.js";
import { deleteContact } from "../controllers/contactsControllers.js";
import { getAllContacts } from "../controllers/contactsControllers.js";
import { getOneContact } from "../controllers/contactsControllers.js";
import { updateContact } from "../controllers/contactsControllers.js";
import { checkCreateContacts } from "../middleware/contactsMiddleware.js";
import { checkUppdateContacs } from "../middleware/contactsMiddleware.js";
import { checkUppdateStatusContacs } from "../middleware/contactsMiddleware.js";
import { checkUserId } from "../middleware/contactsMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

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

router.use(protect);

router.route("/").post(checkCreateContacts, createContact).get(getAllContacts);

router.use("/:id", checkUserId);
router
  .route("/:id")
  .get(getOneContact)
  .delete(deleteContact)
  .put(checkUppdateContacs, updateContact)
  .patch(checkUppdateContacs, updateContact);

router.use("/:id/favorite", checkUserId);
router
  .route("/:id/favorite")
  .put(checkUppdateStatusContacs, updateContact)
  .patch(checkUppdateStatusContacs, updateContact);

export { router };
