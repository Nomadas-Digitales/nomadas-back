DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS home CASCADE;
DROP TABLE IF EXISTS city CASCADE; 

DROP EXTENSION IF EXISTS "uuid-ossp";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS home (
  propertyCode INTEGER PRIMARY KEY,
  address VARCHAR(100),
  province VARCHAR(50),
  city VARCHAR(50),
  idCity INTEGER references city(idCity),
  district VARCHAR(50),
  neighborhood VARCHAR(50),
  country VARCHAR(50),
  latitude NUMERIC(18,7),
  longitude NUMERIC(18,7),
  distance INTEGER,
  distanceBeach INTEGER,
  floor SMALLINT, 
  price SMALLINT,
  propertyType VARCHAR(50),
  size SMALLINT,
  exterior BOOLEAN,
  rooms SMALLINT,
  bathrooms SMALLINT,
  status VARCHAR(50),
  haslift BOOLEAN,
  internet SMALLINT,
  safety SMALLINT,
  zonaTranquila BOOLEAN,
  score INTEGER,
  available BOOLEAN
);

CREATE TABLE IF NOT EXISTS users (
  userId uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  firstName VARCHAR(50),
  lastName VARCHAR(50),
  hash VARCHAR(20) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  gender VARCHAR(1),
  birthDate DATE,
  nationality VARCHAR(50),
  access_token TEXT,
  activation_token TEXT,
  confirmation_token TEXT
);

CREATE TABLE IF NOT EXISTS city (
  idCity INTEGER PRIMARY KEY,
  city VARCHAR(50),
  idCountry INTEGER, 
  weather NUMERIC(18,7),
  safety SMALLINT,
  avgCost NUMERIC(18,2),
  fun SMALLINT,
  cooworking BOOLEAN,
  sharemobility BOOLEAN,
  cyclingfriendly BOOLEAN,
  publicTransport BOOLEAN, 
  score INTEGER
);