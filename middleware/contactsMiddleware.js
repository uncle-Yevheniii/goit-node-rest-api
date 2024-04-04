import { getContactById } from "../services/contactsServices.js";

export const checkUserId = async (req, res, next) => {
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
};
