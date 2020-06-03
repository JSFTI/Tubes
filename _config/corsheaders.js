module.exports = function(req, res, next){
	const allowedHost = "http://localhost:4200";
	if(allowedHost.indexOf(req.headers.origin) > -1){
		res.header("Access-Control-Allow-Origin", req.headers.origin);
		res.header("Access-Control-Allow-Credentials", true);
		res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
		res.header("Access-Control-Allow-Headers", "Content-Type");
	}
	next();
}