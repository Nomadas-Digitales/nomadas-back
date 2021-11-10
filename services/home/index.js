const router = require("express").Router();

module.exports = (db) => {
  router.get("/list", require("./getHouseByCity")(db));
  router.get("/list/home", require("./getHome")(db));
  return router;
};
