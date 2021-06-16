const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
// const sequelize = new Sequelize('iskcon_family', 'postgres', 'welcome', {
// 	host: 'localhost',
// 	dialect: 'postgres',
// });
const sequelize = new Sequelize('postgres://postgres:welcome@localhost:5432/iskcon_family');
try {
	sequelize.authenticate();
	console.log('Connection has been established successfully.');
  } catch (error) {
	console.error('Unable to connect to the database:', error);
  }
module.exports = sequelize;
