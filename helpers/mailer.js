const transporter = require("../config/mailer");
const { activation, confirmation } = require("./templates");
const { catcher } = require("../utils");

const send = transporter.sendMail.bind(transporter);

const sendMail = {
  activation: async ({ to, token }) => {
    await catcher(send)(activation({ to, token }));
  },
  confirmation: async ({ to, username }) => {
    await catcher(send)(confirmation({ to, username }));
  },
};

module.exports = {
  sendMail,
};
