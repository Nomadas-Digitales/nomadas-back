const router = require("express").Router();

module.exports = (db) => {
  router.get("/", require("./getByFilters")(db));

  return router;
};
