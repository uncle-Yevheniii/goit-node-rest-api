import { errorText } from "../constants/errorText.js";

const { e500 } = errorText;

export const errorGlobalHandler = (e, req, res, next) => {
  console.log(e);

  if (process.env.NODE_ENV !== "development") {
    return res.status(e.status ?? 500).json({
      message: !e.status || e.status === 500 ? e500 : e.message,
    });
  }
  res
    .status(e.status ?? 500)
    .json({ message: e.message, data: e.data, stack: e.stack });
};
