const jwt = require("jsonwebtoken");

async function requireUser(req, res, next) {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.redirect("/users/login");
			} else {
				console.log(decodedToken);
				req.params.id = decodedToken.userId;
				req.params.name = decodedToken.name;
				next();
			}
		});
	} else {
		res.redirect("/users/login");
	}
}
module.exports = { requireUser };
