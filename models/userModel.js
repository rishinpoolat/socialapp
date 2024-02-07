const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const User = sequelize.define(
	"User",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		otpSecret: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		isOtpVerified: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		tableName: "users",
	}
);

module.exports = User;
