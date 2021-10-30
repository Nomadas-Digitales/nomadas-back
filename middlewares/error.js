module.exports = ({ statusCode = 500, error }, _, res, __) => {
  res.status(statusCode).json({
    sucess: false,
    message: error.message,
  });
};
