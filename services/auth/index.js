const router = require("express").Router();

module.exports = (db) => {
  router.post("/register", require("./register")(db));
  router.get("/confirmation/:token", require("./confirm")(db));
  return router;
};
