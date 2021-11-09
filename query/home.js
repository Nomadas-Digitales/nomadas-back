const { sql } = require("slonik");

const getHomes = async (db, { idCity }) => {
  console.log("idCity in BD: ", idCity);
  try {
    const result = await db.query(sql`
            SELECT h.* 
            FROM city AS c
            INNER JOIN home AS h
            ON c.idcity=h.idcity
            WHERE c.idcity = ${idCity}   
      `);
    return result.rows;
  } catch (error) {
    console.info("Error at getHomes query: ", error.message);
    return false;
  }
};

module.exports = {
  getHomes,
};
