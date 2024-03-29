const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
	process.env.DB,
	process.env.DBROLE,
	process.env.DBPASSWORD,
	{
		host: process.env.HOST,
		dialect: "postgres",

		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
		logging: false,
	}
);

module.exports = sequelize;
