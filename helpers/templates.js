const activation = ({ to, token }) => ({
  from: `" 🤟 Tutteam" ${process.env.MAIL_USER}`,
  to,
  subject: "Confirma tu correo",
  html: `
      <h2>Un último paso</h2>
      <p>Para confirmar tu cuenta, haz clic aquí: 
      <a href="${process.env.SERVER_URL}:${process.env.PORT}/auth/confirmation/${token}" target="_blank"> ${process.env.SERVER_URL}:${process.env.PORT}/auth/confirmation/${token} </a>
      </p>
      <p>Muchas gracias.</p>
    `,
});

module.exports = {
  activation,
};
