const sequelize = require("./index");
const Follow = require("./followModel");
const Post = require("./postModel");
const Like = require("./likeModel");
const Comment = require("./commentModel");
const User = require("./userModel");
const Notification = require("./notificationModel");

User.hasMany(Post, { foreignKey: "userId",onDelete:"cascade"  });
Post.belongsTo(User, { foreignKey: "userId",onDelete:"cascade"  });

User.hasMany(Like, { foreignKey: "userId",onDelete:"cascade"  });
Like.belongsTo(User, { foreignKey: "userId",onDelete:"cascade"  });

User.hasMany(Comment, { foreignKey: "userId",onDelete:"cascade"  });
Comment.belongsTo(User, { foreignKey: "userId",onDelete:"cascade"  });

User.hasMany(Notification, { foreignKey: "userId",onDelete:"cascade"  });
Notification.belongsTo(User, { foreignKey: "userId",onDelete:"cascade"  });

Post.hasMany(Like, { foreignKey: "postId" , onDelete:"cascade"});
Like.belongsTo(Post, { foreignKey: "postId",onDelete:"cascade" });

Post.hasMany(Comment, { foreignKey: "postId" ,onDelete:"cascade" });
Comment.belongsTo(Post, { foreignKey: "postId",onDelete:"cascade"  });

User.belongsToMany(User, {
	through: Follow,
	as: "followers",
	foreignKey: "followingId",
	onDelete:"cascade" 
});
User.belongsToMany(User, {
	through: Follow,
	as: "followings",
	foreignKey: "followerId",
	onDelete:"cascade" 
});

module.exports = {
	sequelize,
	User,
	Post,
	Like,
	Comment,
	Follow,
	Notification,
};
