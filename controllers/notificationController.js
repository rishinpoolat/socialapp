const { Notification } = require("../models/config");

async function addNotification(req, res) {
	try {
		const {userId, content} = req.body;
		
		await Notification.create({
			userId,
			content,
			isRead: false,
		});
		console.log("notification added successfully");
		return res.status(201).json({ message: "notification added successfully" });
	} catch (error) {
		console.error("Error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}
async function getNotifications(req, res) {
	try {
		const userId = req.params.id;
		const notifications = await Notification.findAll({
			where: { userId, isRead: false },
			attributes: ["content"], // Select only the 'content' attribute
		});
		const contents = notifications.map((notification) => notification.content);
		console.log(notifications);
		return res.render("notifications.ejs", { contents,userId });
	} catch (error) {
		console.error("Error:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}
async function updateNotifications(req, res) {
	try {
		const userId = req.params.id;
		// Update all notifications for the user to set isRead to true
		await Notification.update({ isRead: true }, { where: { userId } });

		return res.status(200).json({message:"all notifications marked as read"}); // Send a success response
	} catch (error) {
		console.error("Error:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}
module.exports = { addNotification, getNotifications, updateNotifications };
