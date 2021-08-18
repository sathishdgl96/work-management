const express=require('express')
const routes=express.Router()
const authUser=require('../models/authUser')
const notify=require('../models/notify')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

routes.get(['/dashboard','/onboarding','/profile','/manage','/teams','/addtask'],(req,res,next)=>
{  
    if(!req.session.userid)
    {
        res.redirect('/login');
    }
    else
    {
        next();
    }
});
routes.get('/',(req,res,next)=>
{
  res.render(appRoot+'/html/index.ejs',{'username':'sathish'}) 
})

routes.get('/signin',(req,res,next)=>
{
   res.render(appRoot+'/html/signup.ejs',{'username':'sathish'}) 
})


routes.get('/apply-leave',(req,res,next)=>
{
   res.render(appRoot+'/html/leaveform.ejs',{'username':'sathish'}) 
})

routes.get('/leave-approve',(req,res,next)=>
{
   res.render(appRoot+'/html/leave-approve.ejs',{'username':'sathish'}) 
})



routes.post('/requestlogin',(req,res,next)=>
{
   res.render(appRoot+'/html/login.ejs',{'username':'sathish'}) 
})

routes.get('/dashboard',(req,res,next)=>
{  
    if(!req.session.userid)
    {
        res.redirect('/login');
    }
    else
    {
    authUser.findOne({ _id: req.session.userid }, (err, obj) => 
    {
        if(obj.role==2)
        {
            res.redirect('/manage');
        }
        else
        {
        res.render(appRoot+'/html/dashboard.ejs',{'username':'sathish'}) 
        }
       })
    }
})

routes.get('/jobs',(req,res,next)=>
{
    res.render(appRoot+'/html/jobs.ejs',{'username':'sathish'})   
})

routes.get('/switch_role',(req,res,next)=>
{
    authUser.findOne({ _id: req.session.userid }, (err, obj) => 
    {
        if(obj.role==1)
        {
            obj.role =2;
            obj.save(function (err) {
                if (err)
                    console.log('error')
                else
                req.session.role=2
                res.redirect('/manage');
            });
        }
        else
        {
            obj.role =1;
            obj.save(function (err) {
                if (err)
                    console.log('error')
                else
                {
                    req.session.role=1
                    res.redirect('/dashboard');
                }  
            });
        }
    }) 
})

routes.get('/getTime',(req,res,next)=>
{
    var datetime = new Date();
    var id=req.session.userid
    notify.findOne({userid:id},(err,data)=>
    {
        if(data)
        {
            res.send({time:datetime, message:data.message,notifyid:data._id}) 
        }
        else
        {
            res.send({time:datetime})
        }
    });
})

routes.get("/dismissnotify",urlencodedParser,(req,res,next)=>
{
var notificationid=req.query.id;
console.log(notificationid)
notify.deleteOne({_id:notificationid},(err,data)=>{
    if(data.deletedCount>=1)
    {
        console.log(data)
    res.send({status:"1"})
    }
    else
    {
        res.send({status:"0"})
    }
})
});
module.exports=routes;