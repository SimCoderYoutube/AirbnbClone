require('dotenv-flow').config();

module.exports = Object.freeze({
  // Database
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  db_uri: process.env.DB_URI,
  db_user: process.env.DB_USER,
  db_pass: process.env.DB_PASS,
  db_name: process.env.DB_NAME,

  session_secret: process.env.SESSION_SECRET,

  port: process.env.PORT,
});
