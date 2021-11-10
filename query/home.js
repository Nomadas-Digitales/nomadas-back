const { sql } = require("slonik");

const getByFilters = async (
  db,
  distance,
  priceMin,
  priceMax,
  distanceBeach,
  internet
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

  try {
    const results = await db.query(
      sql`SELECT * FROM home WHERE ${sql.join(whereClause, sql` AND `)} `
    );

    return results.rows;
  } catch (error) {
    console.info("Error at getByFilters:", error.message);
    return false;
  }
};

module.exports = { getByFilters };
