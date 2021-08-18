var mongoose=require('mongoose');

var apiSchema= new mongoose.Schema({
	email:String,
    apikey:String
});

module.exports = mongoose.model(
	'apikey', apiSchema, 'apikeys');
