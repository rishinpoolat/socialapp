module.exports = {
	apps: [
		{
			name: "socialapp",
			script: "./bin/www",
			instances: "max",
			exec_mode: "cluster",
			watch: false,
			env: {
				NODE_ENV: "production", // Set your environment variables
			},
		},
	],
};
