const { sql } = require("slonik");

const getUserData = async (db, { email, username }) => {
  let whereClause = "";
  if (username) {
    whereClause = sql`WHERE username = ${username}`;
  } else {
    whereClause = sql`WHERE email = ${email}`;
  }
  console.log("whereClause", whereClause);
  try {
    const user = await db.maybeOne(sql`
              SELECT name, surname, username, email, access_token
              FROM users ${whereClause}
      `);
    console.log("user query", user);
    return user;
  } catch (error) {
    console.info("Error at getUserData:", error.message);
    return false;
  }
};

module.exports = { getUserData };
