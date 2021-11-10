require("dotenv").config();

const db = require("../config/db");
const { sql } = require("slonik");
const fs = require("fs");
const path = require("path");
const { raw } = require("slonik-sql-tag-raw");

const seed = async () => {
  try {
    const data = fs.readFileSync(
      path.resolve(__dirname, "../sql", "inserts_home_valencia.sql")
    );
    await db.query(sql`INSERT INTO city (idCity, city, idCountry, province, weather, safety, avgCost, fun, cooworking, sharemobility, cyclingfriendly, publicTransport, score)
    VALUES (1, 'Valencia', 1, 'Valencia', 18.0, 4, 2180, 4, True, True, True, True, 5);`);
    //await db.query(sql`${raw(data.toString())}`);
    await db.query(sql`
    INSERT INTO home (propertyCode, address, district, neighborhood, latitude, longitude, distance, floor, price, propertyType, size, exterior, rooms, bathrooms, status, hasLift, idCity, distanceBeach, internet, zonaTranquila, distanceCoworking, safety, score, available) VALUES (95302409, 'barrio El Cabanyal-El Canyamelar', 'Poblats Marítims', 'El Cabanyal-El Canyamelar', 39.4713938, -0.3267359999999999, 4334, 2, 950, 'flat', 90, True, 4, 2, 'good', True, 1, 1378, 139, False, 3000, 4, 4, True);
    INSERT INTO home (propertyCode, address, district, neighborhood, latitude, longitude, distance, floor, price, propertyType, size, exterior, rooms, bathrooms, status, hasLift, idCity, distanceBeach, internet, zonaTranquila, distanceCoworking, safety, score, available) VALUES (95320802, 'barrio La Creu Coberta', 'Jesús', 'La Creu Coberta', 39.4527742, -0.3858569, 2170, 2, 650, 'flat', 70, True, 2, 1, 'good', True, 1, 6260, 186, False, 3000, 4, 2, True);
    INSERT INTO home (propertyCode, address, district, neighborhood, latitude, longitude, distance, floor, price, propertyType, size, exterior, rooms, bathrooms, status, hasLift, idCity, distanceBeach, internet, zonaTranquila, distanceCoworking, safety, score, available) VALUES (95302103, 'barrio Benimaclet', 'Benimaclet', 'Benimaclet', 39.4878381, -0.3577346999999999, 2501, 1, 700, 'flat', 90, True, 2, 1, 'good', False, 1, 2851, 229, True, 3000, 2, 2, True);
    INSERT INTO home (propertyCode, address, district, neighborhood, latitude, longitude, distance, floor, price, propertyType, size, exterior, rooms, bathrooms, status, hasLift, idCity, distanceBeach, internet, zonaTranquila, distanceCoworking, safety, score, available) VALUES (95163599, 'barrio Benicalap', 'Benicalap', 'Benicalap', 39.4926192, -0.3916506999999999, 2691, 4, 900, 'flat', 80, True, 3, 1, 'good', False, 1, 5810, 192, True, 3000, 2, 4, True);`);

    console.info("> insertion done! 🚀");
  } catch (error) {
    console.info("> insertion error! ❌");
    console.info(">", error.message);
  }
};

seed();
