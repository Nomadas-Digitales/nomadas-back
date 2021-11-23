const router = require("express").Router();

module.exports = (db) => {
  router.get("/list", require("./getAll")(db));
  router.get("/list/home", require("./getDetail")(db));
  router.get("/", require("./getByFilters")(db));
  router.get("/list/by_price", require("./getByPrice")(db));
  return router;
};
