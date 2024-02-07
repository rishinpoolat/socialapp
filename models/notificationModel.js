const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Notification = sequelize.define(
	"Notification",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		isRead: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		tableName: "notifications",
		updatedAt: false,
	}
);

module.exports = Notification;
