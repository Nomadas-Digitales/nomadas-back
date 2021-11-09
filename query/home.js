const { sql } = require("slonik");

const getByFilters = async (
  db,
  distance,
  priceMin,
  priceMax,
  distanceBeach,
  internet
) => {
  const whereConditions = [];

  if (distance) {
    whereConditions.push(`distance < ${distance}`);
  }
  if (priceMin) {
    whereConditions.push(`price > ${priceMin}`);
  }
  if (priceMax) {
    whereConditions.push(`price < ${priceMax}`);
  }
  if (distanceBeach) {
    whereConditions.push(`distanceBeach < ${distanceBeach}`);
  }
  if (internet) {
    whereConditions.push(`internet > ${internet}`);
  }

  const whereClause = sql`${whereConditions.join(" AND ")}`;

  try {
    const results = await db.query(
      sql`SELECT * FROM home WHERE ${whereClause}`
    );

    return results.rows;
  } catch (error) {
    console.info("Error at getByFilters:", error.message);
    return false;
  }
};

module.exports = { getByFilters };
