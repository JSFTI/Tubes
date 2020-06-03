const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const fs = require("fs");

const User = require('../_models/user');
const config = require('../_config/database');

router.post("/login", (req, res, next) => {
	let nomor = req.body.nomor;
	let password = req.body.password;
	
	User.getUserNumber(nomor, (err, user) => {
		if(err) throw err
		if(!user)
			return res.json({success: false});
		if(password == user.Password){
			const token = jwt.sign({data: user}, config.secret, {expiresIn: 86400});
			res.json({
				success: true,
				token: "Bearer " + token,
				userLevel : user.UserLevel,
				nomor: user.Nomor
			});
		} else {
			return res.json({success: false});
		}
	})
})

router.post('/register', (req, res, next) => {
	const reqData = JSON.parse(req.body.data);
	User.addUser(reqData, (err, user) => {
		if(err){
			console.log(err);
			res.json({Success: false});
		} else {
			res.json({Success: true});
		}
	});
})

router.get('/listAdmin', passport.authenticate('jwt', {session: false}), (req, res, next) => {
	const page = parseInt(req.query.page);
	const limit = parseInt(req.query.limit);
	const search = req.query.search;
	const userLevel = req.query.userLevel;
	User.count({
		"Nomor" : { $ne: "Admin" },
		"UserLevel" : userLevel,
		$or: [
			{"Nomor" : { $regex : '.*' + search + '.*'}},
			{"Nama" : { $regex : '.*' + search + '.*'}}
		]
	}, (err, result) =>{
		User.getList(page, limit, search, userLevel, 0, (err, user) => {
			if(err){
				console.log(err);
			} else {
				res.json({
				User : user,
				Count : result});
			}
		});
	});
})

router.put('/updateUser', passport.authenticate('jwt', {session: false}), (req, res, next) => {
	const updateData = JSON.parse(req.body.data);
	User.updateUser(updateData._id, updateData, (err, data) => {
		if(err){
			console.log("An error occureed");
		} else {
			res.json(data);
		}
	})
})

router.delete('/hapusUser', passport.authenticate('jwt', {session: false}), (req, res, next) => {
	const hapusData = req.query.id;
	User.hapusUser(hapusData, (err, data) => {
		if(err){
			console.log("An error occureed");
		} else {
			res.json(data);
		}
	})
})

module.exports = router;