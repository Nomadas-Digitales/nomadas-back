const transporter = require("../config/mailer");
const { activation } = require("./templates");
const { catcher } = require("../utils");

const send = transporter.sendMail.bind(transporter);

const sendMail = {
  activation: async ({ to, token }) => {
    await catcher(send)(activation({ to, token }));
  },
};

module.exports = {
  sendMail,
};
