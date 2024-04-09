export const errorGlobalHandler = (e, req, res, next) => {
  console.log(e);

  if (process.env.NODE_ENV !== "development") {
    return res.status(e.status ?? 500).json({
      message:
        !e.status || e.status === 500 ? "Internal server error" : e.message,
    });
  }
  res
    .status(e.status ?? 500)
    .json({ message: e.message, data: e.data, stack: e.stack });
};
