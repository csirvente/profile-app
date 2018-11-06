const mongoose = require('mongoose');
const User = require('../models/user');

const dbtitle = 'profile-app';
mongoose.connect(`mongodb://localhost/${dbtitle}`);
User.collection.drop();

let user = new User({
	username: "ok",
	password: "ok",
	campus: "Madrid",
	course: "WebDev",
	image: "ok"
})

user.save()
.then(_=>{
	mongoose.connection.close()
})