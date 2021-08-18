var mongoose=require('mongoose');
var schema = new mongoose.Schema({
    _id:Number,
    img: { data: Buffer, contentType: String }
});

module.exports = mongoose.model(
	'photo', schema, 'photos');