var bodyParser = require('body-parser')
const express = require('express')
const routes = express.Router()
const profile = require('../models/profilemodel')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

routes.get('/onboarding', (req, res, next) => {
    console.log("req", req.session.userid);
    var isNew=true;
    profile.findOne({ _id: req.session.userid }, (err, obj) => {
        if(obj!=null)
        {
             isNew=false    
        }
        res.render(appRoot + '/html/profile.ejs', { 'userid': req.session.userid, 'isNew': isNew}) 
    });
})

routes.get('/REST/profile/:id/view', (req, res, next) => {
    var id = req.params.id;
    profile.findOne({ _id: id }, (err, obj) => {
    if(obj!=null)
    {
        var role=1;
        role=req.session.role;
        res.send({name:obj.name,phone:obj.phone,institution:obj.institution, role:role})
        console.log(obj.name)
    }
    });

});

routes.get('/REST/profile/:id/view/name', (req, res, next) => {
    var id = req.params.id;
    profile.findOne({ _id: id }, (err, obj) => {
    if(obj!=null)
    {
        res.send({name:obj.name})
        console.log(obj.name)
    }
    });

});

routes.get('/REST/profile/view/all', (req, res, next) => {
    var id = req.params.id;
    profile.find({}, (err, obj) => {
    if(obj!=null)
    {
        res.send({data:obj})
        console.log(obj.name)
    }
    });

});

routes.post('/REST/profile/:id/update', urlencodedParser,(req, res, next) => {
    var id = req.params.id;
    var newprofile = new profile({ _id: id, name: req.query.name, phone: req.query.phone, institution: req.query.institution });
    profile.findOne({ _id: id }, (err, obj) => {
        if (!obj)
        {
            newprofile.save(function (err) {
                if (err)
                    console.log('error',err)
                else
                   res.send({'status':1})
            });
        }
        else {
            // do your updates here
            obj.name = newprofile.name;
            obj.phone = newprofile.phone;
            obj.institution = newprofile.institution;
            obj.save(function (err) {
                if (err)
                    console.log('error')
                else
                   res.send({'status':1})
            });
        }
    });
    console.log("id", id);

});
module.exports = routes