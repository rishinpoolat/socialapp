const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Follow = sequelize.define(
	"Follow",
	{
		followingId: {
			type: DataTypes.INTEGER,
		},
		followerId: {
			type: DataTypes.INTEGER,
		},
	},
	{
		tableName: "follows",
		updatedAt: false,
		indexes: [
			{
				unique: true,
				fields: ["followerId", "followingId"],
			},
		],
	}
);

module.exports = Follow;
