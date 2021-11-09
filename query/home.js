const { sql } = require("slonik");

const getHouseByCity = async (db, { id }) => {
  
  try {
    const result = await db.query(sql`
            SELECT h.* 
            FROM city AS c
            INNER JOIN home AS h
            ON c.idcity=h.idcity
            WHERE c.idcity = ${id}   
      `);
    return result.rows;
  } catch (error) {
    console.info("Error at getHouseByCity query: ", error.message);
    return false;
  }
};

const getHome = async (db, { id }) => {
  
  try {
    const result = await db.maybeOne(sql`
            SELECT * 
            FROM home
            WHERE propertycode = ${id}   
      `);
    return result;
  } catch (error) {
    console.info("Error at getHome query: ", error.message);
    return false;
  }
};

module.exports = {
  getHouseByCity,
  getHome
};
