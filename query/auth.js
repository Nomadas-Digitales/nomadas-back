const { sql } = require("slonik");

const createUser = async (db, { email, username, hash, token }) => {
  try {
    const result = await userExist(db, { email, username });
    if (result) throw new Error("Username or email already on use");
    return await db.query(sql`
        INSERT INTO users ( email, username, hash, activation_token )
        VALUES ( ${email}, ${username}, ${hash}, ${token} )
      `);
  } catch (error) {
    console.info('> Error at "createUser" query:', error.message);
    return false;
  }
};

const userExist = async (db, { email, username }) => {
  return await db.maybeOne(sql`
      SELECT * FROM users
      WHERE email = ${email} OR username = ${username}
    `);
};

module.exports = { createUser };
