const mysql = require("mysql2");
const dbConfig = require("../config/database.config.js");

console.log('dbConfig--------------', dbConfig);
// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.DB_HOST,
  user: dbConfig.DB_USER,
  password: dbConfig.DB_PASS,
  database: dbConfig.DB_NAME,
  charset: "utf8mb4",
});

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");

//   connection.query('SELECT * FROM latest_crs_draws', (err, results, fields) => {
//     if (err) throw err;
//     console.log(results);
//   });
});

module.exports = connection;

// // Importing the pg package and dotenv (to load environment variables)

// const mysql = require('mysql2');

// // Create a connection to the database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'immigence'
// });

// // Connect to the database
// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL Database!');
  
//   // Example query
//   connection.query('SELECT * FROM latest_crs_draws', (err, results, fields) => {
//     if (err) throw err;
//     console.log(results);
//   });

//   // Close the connection
//   connection.end();
// });