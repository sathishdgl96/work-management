var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const express = require('express')
const teams = require("../models/team");
const user = require("../models/authUser")
const task = require("../models/task")
const jobpool = require("../models/jobpool")
var random = require('random')
const notify = require("../models/notify");
const routes = express.Router()
routes.get('/jobpool', (req, res, next) => 
{
    jobpool.find({employerid:req.session.userid},(err,data)=>{
        if(data)
        {
            res.render(appRoot + '/html/jobpool.ejs',{jobpool:data,role:0})
        }
        else
        {
            res.render(appRoot + '/html/jobpool.ejs',{role:0})   
        }
    })
    
})

routes.get('/empjobpool', async(req, res, next) => 
{
    var employerid=await teams.findOne({employeeid:req.session.userid},{employerid:1, _id:0})
    console.log(employerid.employerid)
    if(employerid==null)
    {
        res.render(appRoot + '/html/jobpool.ejs',{role:1}) 
    }
    else
    {
    jobpool.find({employerid:employerid.employerid},(err,data)=>{
        if(data)
        {
            res.render(appRoot + '/html/jobpool.ejs',{jobpool:data,role:1})
        }
        else
        {
        
            res.render(appRoot + '/html/jobpool.ejs',{role:1})   
        }
    })
}

})

routes.get('/pickjob/:taskid',(req, res, next) => 
{
    jobpool.findOne({_id:req.params.taskid},(err,data)=>{
        if(data)
        {
    var newtask = new task()
    newtask._id = req.params.taskid
    newtask.employeeid = req.session.userid
    newtask.employerid = data.employerid
    newtask.task = data.task
    newtask.message = data.message
    newtask.date = data.date
    newtask.status=0;
    newtask.save((err, data) => {
        if (err) {
            console.log(err)
            res.send({ status: '0' })
        }
        else
        {
            jobpool.findOneAndDelete({_id:req.params.taskid},(err,data)=>{
                if(err)
                {
                    console.log(err)
                }
                else
                {
                    res.redirect('/dashboard');
                }
            })
        }
    });
}
    });
});

module.exports=routes