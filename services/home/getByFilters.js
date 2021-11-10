const { getByFilters } = require("../../query/home");

module.exports = (db) => async (req, res, next) => {
  const { distance, priceMin, priceMax, distanceBeach, internet } = req.query;

  // me salto las validaciones de tipo de variable para correr. errores 400

  const result = await getByFilters(
    db,
    distance,
    priceMin,
    priceMax,
    distanceBeach,
    internet
  );

  if (result === false) {
    return next({
      statusCode: 500,
      error: new Error("An error occurs"),
    });
  }

  res.status(200).json({
    success: "true",
    data: result,
  });
};
