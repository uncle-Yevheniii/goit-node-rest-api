const messageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const HttpError = (status, message = messageList[status], err) => {
  const errorMessage = `Error: ${status} - ${message} - ${err}`;

  const error = new Error(errorMessage);
  error.status = status;

  return error;
};

export { HttpError };
