const { hash } = require("../../helpers");
const { sendMail } = require("../../helpers/mailer");
const { getUserData } = require("../../query/user");
const { updateToken } = require("../../query/auth");

const passwordForgotten = (db) => async (req, res, next) => {
  const { email, username } = req.body;

  if (!email && !username) {
    return next({ error: new Error("Given data failed.") });
  }

  const user = await getUserData(db, { email, username });

  if (!user) {
    return next({ error: new Error("User does not exist.") });
  }

  const token = await hash.createConfirmToken();

  const newToken = await updateToken(db, token, { email, username });

  if (!newToken) {
    return next({ error: new Error("Something went wrong.") });
  }

  await sendMail.passwordUpdate({ email: user.email, token });

  res.status(200).json({
    success: true,
    info: "Email has been sent.",
  });
};

module.exports = passwordForgotten;
