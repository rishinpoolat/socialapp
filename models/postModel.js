const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Post = sequelize.define(
	"Post",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		body: {
			type: DataTypes.TEXT,
		},
		userId: {
			type: DataTypes.INTEGER,
		},
		media: {
			type: DataTypes.BLOB,
		},
	},
	{
		tableName: "posts",
	}
);

module.exports = Post;
