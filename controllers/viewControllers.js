import { User } from "../models/usersModel.js";

export const homeController = async (req, res, next) => {
  try {
    const user = await User.find();

    res.status(200).render("home", {
      title: "Home page!",
      active: "home",
      user,
    });
  } catch (e) {
    next(e);
  }
};
