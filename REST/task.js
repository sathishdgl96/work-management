var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const express = require('express')
const teams = require("../models/team");
const user = require("../models/authUser")
const task = require("../models/task")
const profile = require("../models/profilemodel")
var random = require('random')
const notify = require("../models/notify");
const routes = express.Router()
routes.get('/addtask', (req, res, next) => {
    var id = req.session.userid

    teams.find({ employerid: id }, (err, data) => {
        if (!data) {
            res.render(appRoot + '/html/addtask.ejs')
        }
        else {
            let empids = new Array(data.length);
            for (const item of data) {
                empids.push(item.employeeid)
            }
            user.find({ _id: empids }, (err, user) => {
                if (user) {
                    res.render(appRoot + '/html/addtask.ejs', { data: user });
                }
                else {
                    res.render(appRoot + '/html/addtask.ejs')
                }
            })
        }
    })

})

routes.post('/rest/:id/addtask', urlencodedParser, (req, res, next) => {
    console.log(req.body)
    var empid = req.params.id;
    var employerid = req.session.userid;
    var newtask = new task()
    newtask._id = random.int(200, 624233232);
    newtask.employeeid = empid
    newtask.employerid = employerid
    newtask.task = req.body.task
    newtask.message = req.body.message
    newtask.date = req.body.date
    newtask.save((err, data) => {
        if (err) {
            console.log(err)
            res.send({ status: '0' })
        }
        else {
            var newnotify = notify()
            newnotify._id = random.int(200, 624233232);
            newnotify.userid = empid;
            newnotify.message = "Task added to you : " + req.body.task
            newnotify.save(function (err, data2) {
                if (err) {
                    console.log("error in creating notification");
                }
                else {
                    console.log("added successfully");
                }
            })
            res.send({ status: '1' })
        }
    })
})

routes.get('/manage', (req, res, next) => {
    user.findOne({ _id: req.session.userid }, (err, obj) => {
        if (obj.role == 1) {
            res.redirect('/dashboard');
        }
        else {
            var id = req.session.userid;
            task.find({ employerid: id }, (err, data) => {
                if (data) 
                {
                    let empids = new Array(data.length);
                    for (const item of data) {
                        empids.push(item.employeeid)
                    }
                    console.log(empids);
                    profile.find({_id:empids},(err,names)=>{
                        res.render(appRoot + '/html/manager_dashboard.ejs', { data: data,names:names })
                    })
                  
                }
                else {
                    res.render(appRoot + '/html/manager_dashboard.ejs')
                }
            })

        }
    })
})

module.exports = routes