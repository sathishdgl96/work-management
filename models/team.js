var mongoose=require('mongoose');

var Schema = new mongoose.Schema({
	_id:Number,
	employerid:Number,
	employeeid:Number,
});

module.exports = mongoose.model(
	'team', Schema, 'teams');
