const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Comment = sequelize.define(
	"Comment",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		content: {
			type: DataTypes.TEXT,
		},
		userId: {
			type: DataTypes.INTEGER,
		},
		postId: {
			type: DataTypes.INTEGER,
		},
	},
	{
		tableName: "comments",
	}
);

module.exports = Comment;
