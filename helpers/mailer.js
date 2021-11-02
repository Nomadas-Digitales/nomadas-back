const transporter = require("../config/mailer");
const { activation, confirmation, passwordUpdate } = require("./templates");
const { catcher } = require("../utils");

const send = transporter.sendMail.bind(transporter);

const sendMail = {
  activation: async ({ to, token }) => {
    await catcher(send)(activation({ to, token }));
  },
  confirmation: async ({ to, username }) => {
    await catcher(send)(confirmation({ to, username }));
  },
  passwordUpdate: async ({ email, token }) => {
    await catcher(send)(passwordUpdate({ email, token }));
  },
};

module.exports = {
  sendMail,
};
