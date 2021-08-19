var mongoose=require('mongoose');

var Schema = new mongoose.Schema({
	_id:Number,
	employeeid:Number,
    employerid:Number,
    task:String,
	message:String,
    date:Date,
    status:Number,
    submission: {name:String, data: Buffer, contentType: String },
    submissiondate:Date,
    submissionmessage:String

});

module.exports = mongoose.model(
	'task', Schema, 'tasks');
