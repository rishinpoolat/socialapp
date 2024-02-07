const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Like = sequelize.define(
	"Like",
	{
		userId: {
			type: DataTypes.INTEGER,
		},
		postId: {
			type: DataTypes.INTEGER,
		},
	},
	{
		tableName: "likes",
		updatedAt: false,
		indexes: [
			{
				unique: true,
				fields: ["userId", "postId"],
			},
		],
	}
);

module.exports = Like;
