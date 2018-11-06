const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	campus: {
		type: String, 
		enum: [
			"Madrid", 
			"Barcelona", 
			"Miami", 
			"Paris", 
			"Berlin", 
			"Amsterdam", 
			"México", 
			"Sao Paulo"
			]
		},
	course: {
		type: String, 
		enum: ["WebDev", "UX/UI", "Data Analytics"]
	},
	image: String
})

const User = mongoose.model('User', UserSchema);
module.exports = User;