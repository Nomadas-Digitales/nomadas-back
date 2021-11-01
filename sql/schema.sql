DROP TABLE IF EXISTS users CASCADE;
DROP EXTENSION IF EXISTS "uuid-ossp";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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