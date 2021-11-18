const activation = ({ to, token }) => ({
  from: `" 🤟 Tutteam" ${process.env.MAIL_USER}`,
  to,
  subject: "Confirma tu correo",
  html: `
      <h2>Un último paso</h2>
      <p>Para confirmar tu cuenta, haz clic aquí: 
      <a href="${process.env.VERCEL_URL}:${process.env.PORT}/auth/confirmation/${token}" target="_blank"> ${process.env.VERCEL_URL}:${process.env.PORT}/auth/confirmation/${token} </a>
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
    <p> Tu cuenta ha sido verificada ${username}. </p>
    <p> Bienvenido ! </p>  
  `,
});

const passwordUpdate = ({ email, token }) => ({
  from: `" 🤟 Tutteam" ${process.env.MAIL_USER}`,
  to: `${email}`,
  subject: "Contraseña olvidada",
  html: `
  <h2>¿Has olvidado tu contraseña?</h2>
  <p>Haz clicl <a href="${process.env.VERCEL_URL}:${process.env.PORT}/auth/password/request?token=${token}&email=${email}"> aquí </a> para poder obtener una nueva contraseña</p>
  <p>Gracias por tu confianza</p>
  `,
});
module.exports = {
  activation,
  confirmation,
  passwordUpdate,
};
