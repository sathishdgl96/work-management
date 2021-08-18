var mongoose=require('mongoose');

var Schema = new mongoose.Schema({
	_id:Number,
	userid:Number,
	message:String
});

module.exports = mongoose.model(
	'notification', Schema, 'notifications');
