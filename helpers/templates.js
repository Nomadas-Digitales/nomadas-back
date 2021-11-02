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

const confirmation = ({ to, username }) => ({
  from: `" 🤟 Tutteam" ${process.env.MAIL_USER}`,
  to,
  subject: `${username}, tu cuenta ha sido verificada`,
  html: `
    <h2> Gracias por registrarte ${username} </h2>
    <p> ${username}, esto es un template de plantilla </p>  
  `,
});

module.exports = {
  activation,
  confirmation,
};
