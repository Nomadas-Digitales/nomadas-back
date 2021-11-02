const { confirmUser } = require("../../query/auth");
const { sendMail } = require("../../helpers/mailer");

module.exports = (db) => async (req, res, next) => {
  const { token } = req.params;
  console.log("token", req.params);

  const [result] = await confirmUser(db, { token });
  if (!result) {
    return next({
      statusCode: 400,
      error: new Error("Invalid token"),
    });
  }

  await sendMail.confirmation({ to: result.email, username: result.username });

  res.status(200).json({
    success: true,
    message: "> Account activated, sent email with user details",
  });
};
