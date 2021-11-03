const { hash } = require("../../helpers");
const { getByToken } = require("../../query/auth");
const { updateUserPassword } = require("../../query/user");

const newPassword = (db) => async (req, res, next) => {
  const { email, token } = req.query;
  const { password } = req.body;

  if (!password || !email || !token) {
    return next({ statusCode: 400, error: new Error("Given data failed") });
  }

  const userCheck = await getByToken(db, token);

  if (!userCheck || userCheck.email !== email) {
    return next({ statusCode: 400, error: new Error("Something went wrong.") });
  }
  const newHash = await hash.encrypt(password);

  const newUser = await updateUserPassword(db, {
    newHash,
    email: userCheck.email,
  });

  if (!newUser) {
    return next({ error: new Error("Error happened") });
  }

  res.status(200).json({
    success: true,
    info: "Password has been changed correctly.",
  });
};

module.exports = newPassword;
