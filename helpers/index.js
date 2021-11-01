const { encrypt, compare, createConfirmToken } = require("./hash");

module.exports = {
  hash: { encrypt, compare, createConfirmToken },
};
