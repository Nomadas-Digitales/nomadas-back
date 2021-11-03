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
  try {
    return await db.maybeOne(sql`
      SELECT * FROM users
      WHERE email = ${email} OR username = ${username}
    `);
  } catch (error) {
    console.info('> Error at "userExist" query:', error.message);
    return false;
  }
};

const confirmUser = async (db, { token }) => {
  try {
    return await db.transaction(async (tx) => {
      const result = await tx.maybeOne(sql`
        SELECT * FROM users
        WHERE activation_token = ${token}
      `);
      if (!result) throw new Error("invalid token");
      await tx.query(sql`
        UPDATE users
        SET
          activation_token = null
  
        WHERE
          activation_token = ${token}
      `);
      return result;
    });
  } catch (error) {
    console.info('> Error at "confirmUser" query:', error.message);
    return false;
  }
};

const getUserByEmailOrUsername = async (
  db,
  mail = "",
  username = "",
  comparationFn
) => {
  try {
    const result = await db.one(
      sql`SELECT email, username, hash, id FROM users WHERE email LIKE ${mail} OR username LIKE ${username}`
    );

    if (!result) {
      throw new Error("invalid credentials");
    }

    const isValidPassword = await comparationFn(result.hash);

    if (!isValidPassword) {
      throw new Error("invalid credentials");
    }

    return result;
  } catch (error) {
    console.info("error at getUserByEmail query:", error.message);
    return false;
  }
};

const keepAccessToken = async (db, token, id) => {
  try {
    const result = await db.query(
      sql`UPDATE users SET access_token=${token} WHERE id=${id}`
    );
    return result;
  } catch (error) {
    console.info("error at keepAccessToken query:", error.message);
    return false;
  }
};

const updateToken = async (db, token, { email = "default" }) => {
  try {
    await db.query(
      sql`UPDATE users SET confirmation_token = ${token} WHERE email LIKE ${email}`
    );
    return true;
  } catch (error) {
    console.info("error at updateToken query:", error.message);
    return false;
  }
};

const getByToken = async (db, token) => {
  try {
    const { email, username } = await db.one(
      sql`SELECT username, email FROM users WHERE confirmation_token LIKE ${token}`
    );
    return { email, username };
  } catch (error) {
    console.info("error at getByToken query:", error.message);
    return false;
  }
};

module.exports = {
  createUser,
  confirmUser,
  getUserByEmailOrUsername,
  keepAccessToken,
  updateToken,
  getByToken,
};
