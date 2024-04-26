import multer from "multer";
import path from "path";
import jimp from "jimp";
import * as fse from "fs-extra";
import { nanoid } from "nanoid";

import { HttpError } from "../helpers/HttpError.js";

export const initUploadImageServices = (fieldName) => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = (req, file, cbk) => {
    if (file.mimetype.startsWith("image/")) {
      cbk(null, true);
    } else {
      cbk(HttpError(400, "Please, upload images only.."), false);
    }
  };

  return multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  }).single(fieldName);
};

export const saveImageServices = async (file, options, ...pathSegments) => {
  if (
    file.size >
    (options?.maxFileSize ? options.maxFileSize * 1024 * 1024 : 1 * 1024 * 1024)
  ) {
    throw HttpError(400, "large");
  }

  const fileName = `${nanoid()}.jpeg`;
  const fullFilePath = path.join(process.cwd(), "public", ...pathSegments);

  await fse.ensureDir(fullFilePath);
  await jimp.read(file.buffer, (e, img) => {
    try {
      img.resize(options?.width ?? 200, options?.height ?? 200);
      img.quality(options?.quality ?? 85);
      img.write(fullFilePath, fileName);
    } catch (e) {
      HttpError(400, "err");
    }
  });

  return path.join(...pathSegments, fileName);
};
