import gravatar from "gravatar";

export const createUserGravartarServises = (userData) => {
  const avatar = gravatar.url(userData, {
    s: "200",
    d: "identicon",
    r: "pg",
    protocol: "https",
  });

  return avatar;
};
