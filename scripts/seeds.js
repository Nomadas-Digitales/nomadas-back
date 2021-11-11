require("dotenv").config();

const db = require("../config/db");
const { sql } = require("slonik");
const fs = require("fs");
const path = require("path");
const { raw } = require("slonik-sql-tag-raw");

const seed = async () => {
  try {
    const data = fs.readFileSync(
      path.resolve(__dirname, "../sql", "inserts_home_valencia_confoto.sql")
    );
    await db.query(sql`INSERT INTO city (idCity, city, idCountry, province, weather, safety, avgCost, fun, cooworking, sharemobility, cyclingfriendly, publicTransport, score)
    VALUES (1, 'Valencia', 1, 'Valencia', 18.0, 4, 2180, 4, True, True, True, True, 5);`);
    // await db.query(sql`${raw(data.toString())}`);
    await db.query(sql`
    INSERT INTO home (propertyCode, address, district, neighborhood, latitude, longitude, distance, floor, price, propertyType, size, exterior, rooms, bathrooms, status, hasLift, idCity, distanceBeach, internet, zonaTranquila, distanceCoworking, safety, score, available, thumbnail) VALUES (95768462, 'Calle de Felipe Salvador', 'Camins al Grau', 'Aiora', 39.4629836, -0.3380281, 3485, 3, 650, 'flat', 60, False, 2, 1, 'good', False, 1, 2564, 224, False, 3000, 1, 4, True, 'https://img3.idealista.com/blur/WEB_LISTING/0/id.pro.es.image.master/19/e1/c0/927672951.jpg');
    INSERT INTO home (propertyCode, address, district, neighborhood, latitude, longitude, distance, floor, price, propertyType, size, exterior, rooms, bathrooms, status, hasLift, idCity, distanceBeach, internet, zonaTranquila, distanceCoworking, safety, score, available, thumbnail) VALUES (95767951, 'Calle de la Democracia, Nou Moles', 'L''Olivereta', 'Nou Moles', 39.4717632, -0.4012954999999999, 2066, 5, 730, 'flat', 75, True, 2, 1, 'good', True, 1, 6687, 257, True, 3000, 2, 4, True, 'https://img3.idealista.com/blur/WEB_LISTING/0/id.pro.es.image.master/15/01/2e/927659135.jpg');
    INSERT INTO home (propertyCode, address, district, neighborhood, latitude, longitude, distance, floor, price, propertyType, size, exterior, rooms, bathrooms, status, hasLift, idCity, distanceBeach, internet, zonaTranquila, distanceCoworking, safety, score, available, thumbnail) VALUES (95720789, 'barrio La Petxina', 'Extramurs', 'La Petxina', 39.4725289, -0.3900405999999999, 1110, 3, 720, 'flat', 80, True, 3, 1, 'good', False, 1, 5724, 184, True, 3000, 3, 3, True, 'https://img3.idealista.com/blur/WEB_LISTING/0/id.pro.es.image.master/90/db/f3/926381256.jpg');
    INSERT INTO home (propertyCode, address, district, neighborhood, latitude, longitude, distance, floor, price, propertyType, size, exterior, rooms, bathrooms, status, hasLift, idCity, distanceBeach, internet, zonaTranquila, distanceCoworking, safety, score, available, thumbnail) VALUES (95726855, 'barrio El Mercat', 'Ciutat Vella', 'El Mercat', 39.4735918, -0.3803346999999999, 382, 1, 1000, 'flat', 90, True, 3, 2, 'good', False, 1, 4886, 161, True, 3000, 3, 2, True, 'https://img3.idealista.com/blur/WEB_LISTING/0/id.pro.es.image.master/cd/6c/95/926520689.jpg');
    INSERT INTO home (propertyCode, address, district, neighborhood, latitude, longitude, distance, floor, price, propertyType, size, exterior, rooms, bathrooms, status, hasLift, idCity, distanceBeach, internet, zonaTranquila, distanceCoworking, safety, score, available, thumbnail) VALUES (95599661, 'barrio Malilla', 'Quatre Carreres', 'Malilla', 39.4489341, -0.3781703999999999, 2468, 6, 900, 'flat', 70, True, 2, 1, 'good', False, 1, 5987, 193, False, 3000, 1, 3, True, 'https://img3.idealista.com/blur/WEB_LISTING/0/id.pro.es.image.master/20/11/3b/922970909.jpg');

    `);

    console.info("> insertion done! 🚀");
  } catch (error) {
    console.info("> insertion error! ❌");
    console.info(">", error.message);
  }
};

seed();
