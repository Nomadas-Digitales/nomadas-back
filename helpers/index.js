const { encrypt, compare, createConfirmToken } = require("./hash");
const { toJWT, fromJWT } = require("./jwt");

const serialize = (res, { email, username }) => {
  const accessToken = toJWT(email, username);
  return accessToken;
};

const deserialize = (token) => {
  return fromJWT(token);
};

module.exports = {
  serialize,
  hash: { encrypt, compare, createConfirmToken },
  deserialize,
};
