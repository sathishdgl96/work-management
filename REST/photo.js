var bodyParser = require('body-parser')
const express = require('express')
const routes = express.Router()
const photo = require('../models/photo')

routes.post('/:id/photos/add', function (req, res, next) {
    console.log(req.files.image.data);
    console.log(req.files.image.mimetype);
    console.log(req.files.image.name);
    var a = new photo();
    a.img.data = req.files.image.data
    a.img.contentType = req.files.image.mimetype;
    a._id = req.params.id;
    photo.findOne({_id:req.params.id},(err,data)=>
    {
        if(!data)
        {
            a.save(function (err, result) {
                if (err) throw err;
                console.error('saved img to mongo');
                if (result != null) {
                    res.send({ status: 1 })
                }
            });
        }
        else
        {
            photo.updateOne({_id:req.params.id},{img:{data:req.files.image.data,contentType:req.files.image.mimetype}},function (err, result) {
                if (err){
                    console.log(err)
                }else{
                    res.send({ status: 1 }) 
                    console.log("image uploaded"+result)
                }
            });
        }
    });
   
});


routes.get('/:id/photos/view', function (req, res, next) {
    var a = new photo();
    photo.findOne({ _id: req.params.id }, function (err, doc) {
        if (err) return next(err);
        if (doc != null) {
            res.contentType(doc.img.contentType);
            res.send(doc.img.data);
        }
        else {
            res.sendStatus(404)
        }
    });
});

module.exports = routes