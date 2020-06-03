const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../_models/user");
const config = require("./database");

module.exports = function(passport){
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = config.secret;
	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
		User.getUserId(jwt_payload.data._id, (err, user) => {
			if(err){
				return (err, false);
			}
			if(user){
				return done(null, user);
			} else {
				return done(null, false);
			}
		})
	}))
}