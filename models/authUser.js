var mongoose=require('mongoose');

var AuthUserSchema = new mongoose.Schema({
	_id:Number,
	username:{type: String, unique: true},
	password:String,
	role:Number,
	isActive:Number
});

module.exports = mongoose.model(
	'authuser', AuthUserSchema, 'AuthUsers');
