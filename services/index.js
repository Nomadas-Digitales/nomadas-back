const router = require("express").Router();

module.exports = (db) => {
  router.use("/auth", require("./auth")(db));
  router.use("/house", require("./home")(db));

  return router;
};
