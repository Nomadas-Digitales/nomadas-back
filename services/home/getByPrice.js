const { getByPrice } = require("../../query/home");

module.exports = (db) => async (req, res, next) => {
  const { price } = req.query;
  console.log("priceBack", price);
  const intPrice = parseInt(price);
  const result = await getByPrice(db, intPrice);

  if (!result) {
    return next({
      statusCode: 400,
      error: new Error("Something went wrong."),
    });
  }

  res.status(200).json({
    success: true,
    data: result,
  });
};
