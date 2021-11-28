const { hash, serialize } = require("../../helpers");
const {
  getUserByEmailOrUsername,
  keepAccessToken,
} = require("../../query/auth");

const login = (db) => async (req, res, next) => {
  const { email, username, password } = req.body;

  if ((!email && !username) || !password) {
    return next({ statusCode: 400, error: new Error("Given data failed") });
  }

  const user = await getUserByEmailOrUsername(
    db,
    email,
    username,
    hash.compare(password)
  );

  if (!user) {
    return next({ statusCode: 401, error: new Error("Something went wrong") });
  }

  const token = serialize(res, {
    email: user.email,
    username: user.username,
  });

  const result = await keepAccessToken(db, token, user.id);

  if (!result) {
    return next({ error: new Error("Something went wrong") });
  }

  res.status(200).json({
    success: true,
    data: { access_token: token, id: user.id },
  });
};

module.exports = login;
