var mongoose=require('mongoose');

var Schema = new mongoose.Schema({
    _id:Number,
    name:String,
    email:String,
    phone:String,
	city:String,
    state:String,
    country:String,
    organization:String,
    jobProfile:String,
    additionalInfo:String
});
module.exports = mongoose.model(
	'addressbook', Schema, 'addressbooks');