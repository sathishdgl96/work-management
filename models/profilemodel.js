var mongoose=require('mongoose');

var ProfileSchema = new mongoose.Schema({
	_id:Number,
	name:String,
	phone:String,
	institution:String
});

module.exports = mongoose.model(
	'profile', ProfileSchema, 'profiles');