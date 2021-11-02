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

const confirmUser = async (db, { token }) => {
  try {
    return await db.transaction(async (tx) => {
      const { rowCount, rows } = await tx.query(sql`
        SELECT * FROM users
        WHERE activation_token = ${token}
      `);
      if (!rowCount) throw new Error("invalid token");
      await tx.query(sql`
        UPDATE users
        SET
          activation_token = null
  
        WHERE
          activation_token = ${token}
      `);
      return rows;
    });
  } catch (e) {
    console.info('> Error at "confirmUser" query:', e.message);
    return false;
  }
};
module.exports = { createUser, confirmUser };
