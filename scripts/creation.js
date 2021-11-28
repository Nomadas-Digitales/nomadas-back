require("dotenv").config();

const db = require("../config/db");
const { sql } = require("slonik");
const fs = require("fs");
const path = require("path");
const { raw } = require("slonik-sql-tag-raw");

const create = async () => {
  try {
    const schema = fs.readFileSync(
      path.resolve(__dirname, "../sql", "schema.sql")
    );

    await db.query(sql`${raw(schema.toString())}`);
    console.info("> creation done! 🚀");
  } catch (error) {
    console.info("> creation error! ❌");
    console.info(">", error.message);
  }
};

create();
