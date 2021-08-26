const express = require('express')
const routes = express.Router()
const authUser = require("../models/authUser");
const teams = require("../models/team");
const notify = require("../models/notify");
const profile = require("../models/profilemodel");
const leave = require("../models/leavemodel");
const photo = require("../models/photo")
const apigen = require('uuid-apikey');
var bodyParser = require('body-parser')
var random = require('random')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

routes.post('/rest/:id/addteam', urlencodedParser, function (req, res) {
    var id = req.params.id;
    profile.findOne({ _id: id }, (err, obj) => {
        if (obj != null && obj.institution != null && obj.name != null) {
            console.log("username", req.body.username);
            var employername = obj.name
            authUser.findOne({ username: req.body.username }, (err, user) => {
                if (user) {
                    profile.findOne({ _id: user._id }, (err, data) => {
                        var employeeid = data._id;
                        console.log("employer institution:", obj.institution, "employee institution", data.institution);
                        teams.findOne({ employeeid: employeeid, employerid: id }, (err, result) => {
                            if (err) { console.log(err) }
                            if (result) {
                                res.send({ status: 9 })
                            }
                            else {
                                if (data != null && data.institution != null && data.institution == obj.institution) {
                                    var newteam = new teams();
                                    newteam._id = random.int(200, 624233232);
                                    newteam.employeeid = employeeid;
                                    newteam.employerid = id;
                                    if (employeeid == id) {
                                        console.log("you cannot add yourself");
                                        res.send({ status: 7 })
                                    }
                                    else
                                    {
                                    newteam.save(function (err, data1) {
                                        if (err) {
                                            console.log(err)
                                        }
                                        else {
                                            var newnotify = notify()
                                            newnotify._id = random.int(200, 624233232);
                                            newnotify.userid = employeeid;
                                            newnotify.message = "You have been added to teams by " + employername
                                            newnotify.save(function (err, data2) {
                                                if (err) {
                                                    console.log("error in creating notification");
                                                }
                                                else {
                                                    console.log("added successfully");
                                                    res.send({ status: 1, data: data });

                                                }
                                            });
                                        }
                                    })
                                }
                            }
                                else {
                                    console.log("No such user found or not belonged to your organization")
                                    res.send({ status: 0 });
                                }

                            }
                        })

                    });
                }
                else {
                    console.log("No such user exists in the system");
                    res.send({ status: 10 })
                }

            });
        }
        else {
            console.log("Kindly fill your profile first");
            res.send({ status: 0 });
        }
    });

});

routes.get(['/teams', '/rest/:id/viewteam'], urlencodedParser, function (req, res) {
    var employerid = req.session.userid
    teams.find({ employerid: employerid }, (err, response) => {
        if (!response) {
            res.render(appRoot + '/html/team_members.ejs', { 'userid': req.session.userid })
        }
        else {
            let ids = new Array(response.length);
            for (const item of response) {
                console.log(item.employeeid)
                ids.push(item.employeeid)
                console.log(ids)
            }

            profile.find({ _id: ids }, (err, data) => {
                if (data) {
                    res.render(appRoot + '/html/team_members.ejs', { 'userid': req.session.userid, data: data })
                }
                else {
                    res.render(appRoot + '/html/team_members.ejs', { 'userid': req.session.userid })
                }
            });
        }
    })

});


routes.get('/rest/:id/delete', urlencodedParser, function (req, res) {
    teams.findOneAndDelete({ employeeid: req.params.id, employerid: req.session.userid }, (err, data) => {
        if (err) {
            res.send({ status: 0 })
        }
        if (data) {
            var newnotify = notify()
            newnotify._id = random.int(200, 624233232);
            newnotify.userid = req.params.id;
            newnotify.message = "You no longer be a member of the team"
            newnotify.save(function (err, data2) {
                if (err) {
                    console.log("error in creating notification");
                }
                else {
                    console.log("added successfully");
                }
            });
            res.send({ status: 1 })
        }
        else {
            res.send({ status: 0 })
        }
    })
})
routes.post('/applyleave',urlencodedParser,async(req,res,next)=>{
var newleave=leave()
newleave.employeeid=req.session.userid;
newleave._id=random.int(200, 624233232);
newleave.leavetype=req.body.leavetype;
newleave.message=req.body.message;
newleave.startdate=req.body.startdate;
newleave.enddate=req.body.enddate;
newleave.status=0
var employerid=await teams.findOne({employeeid:req.session.userid},{ employerid: 1, _id: 0 })
newleave.employerid=employerid.employerid;
if(employerid!=null)
{
await newleave.save()
var newnotify=notify();
newnotify._id=random.int(200, 624233232);
newnotify.userid=req.session.userid
newnotify.message="Leave Request Submitted: "+req.body.leavetype
await newnotify.save()
console.log(employerid)
res.send({status:'1'})
}
else
{
    res.send({status:'0'})
}
})
module.exports = routes