const router = require("express").Router();

module.exports = (db) => {
  router.get("/list", require("./getHomes")(db));
  

  return router;
};
