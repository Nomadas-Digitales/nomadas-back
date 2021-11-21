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
  }
};

const getByFilters = async (
  db,
  distance,
  priceMin,
  priceMax,
  distanceBeach,
  internet,
  sizeMax,
  sizeMin,
  page,
  pageSize
) => {
  const whereClause = [sql`TRUE`];

  if (distance) {
    whereClause.push(sql`distance < ${distance}`);
  }
  if (priceMin) {
    whereClause.push(sql`price > ${priceMin}`);
  }
  if (priceMax) {
    whereClause.push(sql`price < ${priceMax}`);
  }
  if (distanceBeach) {
    whereClause.push(sql`distanceBeach < ${distanceBeach}`);
  }
  if (internet) {
    whereClause.push(sql`internet > ${internet}`);
  }
  if (sizeMax) {
    whereClause.push(sql`size < ${sizeMax}`);
  }
  if (sizeMin) {
    whereClause.push(sql`size > ${sizeMin}`);
  }

  try {
    const results = await db.query(
      sql`SELECT * FROM home WHERE ${sql.join(
        whereClause,
        sql` AND `
      )} LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize} `
    );

    return results.rows;
  } catch (error) {
    console.info("Error at getByFilters:", error.message);
    return false;
  }
};

module.exports = {
  getHouseByCity,
  getHome,
  getByFilters,
};
