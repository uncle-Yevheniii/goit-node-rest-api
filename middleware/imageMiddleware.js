import multer from "multer";

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cbk) => {
  if (file.mimetype.startsWith("image/")) {
    cbk(null, true);
  } else {
    cbk(HttpError(400, "Please, upload images only.."), false);
  }
};

export const uploadAvatar = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fieldSize: 2 * 1024 * 1024 },
}).single("avatars");
