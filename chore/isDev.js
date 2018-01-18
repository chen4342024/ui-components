const NODE_ENV = process.env.NODE_ENV;
function isDev() {
	return NODE_ENV === "development";
}
module.exports = isDev;