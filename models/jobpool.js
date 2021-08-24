var mongoose=require('mongoose');

var Schema = new mongoose.Schema({
    _id:Number,
    employerid:Number,
    status:Number,
    task:String,
	message:String,
    date:Date
});
module.exports = mongoose.model(
	'jobpool', Schema, 'jobpools');