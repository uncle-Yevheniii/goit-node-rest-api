import { getContactById } from "../services/contactsServices.js";
import { HttpError } from "../helpers/HttpError.js";

export const checkUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getContactById(id);

    if (!user) {
      throw HttpError(404, "Not found");
    }

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};
