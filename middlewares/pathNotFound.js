module.exports = (_, __, next) => {
  next({ error: new Error("path not found") });
};
