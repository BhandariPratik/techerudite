
import mysql from 'mysql';
let db;

export const connectDB = async () => {
  try {
    db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Pratik@12",
      database: "practical1"
    })

    await db.connect();
    console.log('Connected to the database successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

export const custom = async (query) => {
  return new Promise((resolve, reject) => {
    console.log(query)
    db.query(query, (error, results) => {
      if (error) {
        console.log(`\nCustom error ->> ${error}`);
        return reject("INTERNAL_SERVER_ERROR");
      } else {
        return resolve(results);
      }
    });
  });
}