var bodyParser = require('body-parser')
var mime = require('mime');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const express = require('express')
const teams = require("../models/team");
const user = require("../models/authUser")
const task = require("../models/task")
const jobpool=require("../models/jobpool")
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
    if(empid==9)
    {
    var newjobpool=new jobpool()
    newjobpool._id=random.int(200,45443543);
    newjobpool.employerid=employerid;
    newjobpool.status=0;
    newjobpool.task = req.body.task
    newjobpool.message = req.body.message
    newjobpool.date = req.body.date
    newjobpool.save((err,data)=>{
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.send({status:1})
        }
    })
    }
    else
    {
    var newtask = new task()
    newtask._id = random.int(200, 624233232);
    newtask.employeeid = empid
    newtask.employerid = employerid
    newtask.task = req.body.task
    newtask.message = req.body.message
    newtask.date = req.body.date
    newtask.status=0;
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
}
})



routes.get('/manage',async (req, res, next) => {
    user.findOne({ _id: req.session.userid }, (err, obj) => {
        if (obj.role == 1) {
            res.redirect('/dashboard');
        }
        else {
            var id = req.session.userid;
           task.find({ employerid: id }, async (err, data) => {
                if (data) 
                {
                    let empids = new Array(data.length);
                    let taskids=[]
                    var profiles=[]
                    for (const item of data) {
                        empids.push(item.employeeid)
                        taskids.push(item._id)
                        var d=await profile.find({_id:item.employeeid})
                       profiles.push(d);
                    }
                    var notification=await notify.findOne({userid:taskids})
                    if(!notification)
                    {
                       res.render(appRoot + '/html/manager_dashboard.ejs', { data: data,names:profiles,userid:req.session.userid })
                    }
                    else
                    {
                        res.render(appRoot + '/html/manager_dashboard.ejs', { data: data,names:profiles,userid:req.session.userid ,notifications:notification})
                    }
                    //console.log(profiles[0][0].name)
                }
                else {
                    res.render(appRoot + '/html/manager_dashboard.ejs',{userid:req.session.userid})
                }
            })

        }
    })
})

// Employee side
routes.get('/dashboard',(req,res,next)=>
{  
    if(!req.session.userid)
    {
        res.redirect('/login');
    }
    else
    {
    user.findOne({ _id: req.session.userid }, (err, obj) => 
    {
        if(obj.role==2)
        {
            res.redirect('/manage');
        }
        else
        {
            task.find({employeeid:req.session.userid},(err,tasksresult)=>{
                if(!task)
                {
                    
                    res.render(appRoot+'/html/dashboard.ejs',{userid:req.session.userid}) 
                }
                else
                {
                    res.render(appRoot+'/html/dashboard.ejs',{data:tasksresult,pendingcount:tasksresult.length,userid:req.session.userid}); 
                }
            })
        
        }
       })
    }
})


routes.get('/rest/viewtask/:id',(req,res,next)=>
{  
    task.find({_id:req.params.id},(err,data)=>{
        if(data)
        {
            res.render(appRoot+'/html/viewtask.ejs',{data:data})
        }
        else
        {

        }
    })
 
})

routes.post('/rest/submittask/:id',async (req,res,next)=>{
    var taskid=req.params.id;
    var message=req.body.message;
    var status=req.body.status;
    var filedata=req.files.file.data
    var filetype=req.files.file.mimetype
    var filename=req.files.file.name
    var datetime = new Date()
    var newnotify = notify()
            newnotify._id = random.int(200, 624233232);
            newnotify.userid = taskid;
            newnotify.message = taskid+": status changed" 
            newnotify.save(function (err, data2) {
                if (err) {
                    console.log("error in creating notification");
                }
                else {
                    console.log("added successfully");
                }
            })
   let newvalue=await task.findOneAndUpdate({_id:taskid},{submissionmessage:message,status:status,submission:{name:filename,data:filedata,contentType:filetype},submissiondate:datetime},{new:true})
   console.log(newvalue);
   res.send({status:1})
})


routes.get('/rest/viewsubmisssion/:id/download',async (req,res,next)=>{
   var taskid=req.params.id
   let newvalue=await task.findOne({_id:taskid})
   res.writeHead(200, {
    "Content-Disposition": "attachment;filename=" + taskid+"."+mime.getExtension(newvalue.submission.contentType),
    'Content-Type': newvalue.submission.contentType,
    'Content-Length': newvalue.submission.data.length
  });
  res.write(newvalue.submission.data)
})


routes.get('/rest/submissions/:id',(req,res,next)=>
{  
    task.find({_id:req.params.id},(err,data)=>{
        if(data)
        {
            res.render(appRoot+'/html/employerviewtasks.ejs',{data:data})
        }
        else
        {

        }
    })
 
})


module.exports = routes