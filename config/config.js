require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres"
  },
  production: {
    use_env_variable: "DATABASE_URL",
    pool: {
      min: 0,
      max: 5,
      idle: 15000,
      acquire: 30000
    },
    dialect: "postgres",
    dialectOptions: {
      ssl: true,
      rejectUnauthorized: false
    }
  }
};
