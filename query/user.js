const { sql } = require("slonik");

const getUserData = async (db, { email }) => {
  try {
    const user = await db.maybeOne(sql`
              SELECT name, surname, username, email, access_token
              FROM users WHERE email = ${email}
      `);

    return user;
  } catch (error) {
    console.info("Error at getUserData:", error.message);
    return false;
  }
};

const updateUserPassword = async (db, user) => {
  try {
    await db.query(
      sql`UPDATE users SET hash=${user.newHash}, confirmation_token=NULL WHERE email LIKE ${user.email}`
    );
    return true;
  } catch (error) {
    console.info("error at updateHash query:", error.message);
    return false;
  }
};

module.exports = { getUserData, updateUserPassword };
