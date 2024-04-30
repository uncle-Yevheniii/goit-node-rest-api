import jimp from "jimp";
import path from "path";
import * as fse from "fs-extra";
import { nanoid } from "nanoid";

import { HttpError } from "../helpers/HttpError.js";

export const saveImageService = async (file, ...pathSegments) => {
  if (file.size > 2 * 1024 * 1024) throw HttpError(400, "large");

  const fileName = `${nanoid()}-edit.jpeg`;

  const avatar = await jimp.read(file.buffer);

  await avatar
    .resize(250, 250, jimp.RESIZE_BEZIER)
    .quality(90)
    .writeAsync(path.join(process.cwd(), "tmp", fileName));

  await fse.move(
    path.join(process.cwd(), "tmp", fileName),
    path.join(process.cwd(), "public", ...pathSegments, fileName)
  );

  return path.join(...pathSegments, fileName);
};
