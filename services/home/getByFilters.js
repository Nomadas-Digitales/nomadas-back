const { getByFilters } = require("");

module.exports = (db) => async (req, res) => {
  const { distance, priceMin, priceMax, distanceBeach, internet } = req.query;

  // me salto las validaciones de tipo de variable para correr

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
      statusCode: 404,
      error: new Error("No results found"),
    });
  }

  res.status(200).json({
    success: "true",
    data: result,
  });
};
