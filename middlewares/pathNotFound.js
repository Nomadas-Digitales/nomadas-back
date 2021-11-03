module.exports = (_, __, next) => {
  next({ statusCode: 404, error: new Error("path not found") });
};
