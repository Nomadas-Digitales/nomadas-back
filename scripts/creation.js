require("dotenv").config();

const db = require("../config/db");
const { sql } = require("slonik");
const create = async () => {
  try {
    await db.query(sql`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  `);
    await db.query(sql`
    CREATE TABLE IF NOT EXISTS users (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      name TEXT,
      surname TEXT,
      email TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      hash TEXT NOT NULL,
      access_token TEXT,
      activation_token TEXT,
      confirmation_token TEXT
    );
    `);
    console.info("> creation done! 🚀");
  } catch (error) {
    console.info("> creation error! ❌");
    console.info(">", error.message);
  }
};

create();
