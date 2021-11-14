require("dotenv").config();

const db = require("../config/db");
const { sql } = require("slonik");
const fs = require("fs");
const path = require("path");
const { raw } = require("slonik-sql-tag-raw");

const seed = async () => {
  try {
    const houses = fs.readFileSync(
      path.resolve(__dirname, "../sql", "inserts_home_valencia.sql")
    );
    const cities = fs.readFileSync(
      path.resolve(__dirname, "../sql", "inserts_city.sql")
    );
    await db.query(sql`${raw(cities.toString())}`);
    await db.query(sql`${raw(houses.toString())}`);

    console.info("> insertion done! 🚀");
  } catch (error) {
    console.info("> insertion error! ❌");
    console.info(">", error.message);
  }
};

seed();
