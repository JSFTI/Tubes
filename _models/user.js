const mongoose = require("mongoose");
const bcrypy = require("bcryptjs");
const config = require("../_config/database");

const UserSchema = mongoose.Schema({
	ProfilePicture : {
		type: String,
		require: true
	},
	Nomor : {
		type: String,
		required: true
	},
	Password : {
		type: String,
		required: true
	},
	Nama : {
		type: String,
		required: true
	},
	Email : {
		type: String,
		required: true
	},
	Alamat : {
		type: String
	},
	Nik : {
		type: String,
		required: true
	},
	TempatLahir : {
		type: String,
	},
	TanggalLahir : {
		type: Date
	},
	Agama : {
		type: Number,
		required: true
	},
	JenisKelamin : {
		type: Number,
		required: true
	},
	AsalSekolah : {
		type: String
	},
	TanggalDaftar : {
		type: Date
	},
	Ayah : {
		type: String
	},
	Ibu : {
		type: String
	},
	AlamatOrtu : {
		type: String
	},
	WargaNegara : {
		type: String,
		required: true
	},
	Status: {
		type: Boolean,
		required: true
	},
	UserLevel: {
		type: Number,
		required: true
	}
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserId = function(id, callback){
	User.findById(id, callback);
}

module.exports.getUserNumber = function(nomor, callback){
	User.findOne({"Nomor": nomor}, callback);
}

module.exports.addUser = function(data, callback){
	User.create(data, callback);
}

module.exports.count = function(query, callback){
	User.find(query).countDocuments(callback);
}

module.exports.getList = function(page, limit, search, userLevel, mode, callback){
	if(userLevel == 1){
		if(mode == 0){
			User.find({
				"Nomor" : { $ne: "Admin" }, 
				"UserLevel": 1,
				$or: [
					{"Nomor" : { $regex : '.*' + search + '.*'}},
					{"Nama" : { $regex : '.*' + search + '.*'}}
				]
			}, "-Password")
				.skip(page * limit).limit(limit).exec(callback);
		} else {
			User.find({
				"Nomor" : { $ne: "Admin" }, 
				"UserLevel": 1,
				$or: [
					{"Nomor" : { $regex : '.*' + search + '.*'}},
					{"Nama" : { $regex : '.*' + search + '.*'}}
				]
			}, "Nomor Nama JenisKelamin TanggalDaftar Status").skip(page * limit).limit(limit).exec(callback);
		}
	}
}

module.exports.updateUser = function(id, data, callback){
	User.updateOne({_id: id}, data, callback);
}

module.exports.hapusUser = function(id, callback){
	User.deleteOne({_id: id}, callback);
}