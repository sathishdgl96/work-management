var mongoose=require('mongoose');

var Schema = new mongoose.Schema({
    _id:Number,
    employerid:Number,
    employeeid:Number,
    status:Number,
    startdate:Date,
    enddate:Date,
	message:String,
    leavetype:String
});
module.exports = mongoose.model(
	'leave', Schema, 'leaves');