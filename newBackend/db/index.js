// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: "localhost",
//     dialect: "mysql",
//   }
// );



// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");

//     sequelize.sync().then(() => {
//       console.log('Missing Table Created');
//     }, (err) => {
//       console.log('An error occurred while creating the table:', err.message);
//     });

//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// })();



// module.exports = sequelize;
