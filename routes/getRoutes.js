const express=require('express')
const routes=express.Router()
const authUser=require('../models/authUser')
const notify=require('../models/notify')
var bodyParser = require('body-parser')
var random = require('random')
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





routes.post('/requestlogin',(req,res,next)=>
{
   res.render(appRoot+'/html/login.ejs',{'username':'sathish'}) 
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
    console.log("deleted",data)
    res.send({status:"1"})
    }
    else
    {
        res.send({status:"0"})
    }
})
});

routes.get("/addaddress",urlencodedParser,(req,res,next)=>
{
    res.render(appRoot+'/html/addcontact.ejs')   
})

routes.post("/addaddress",urlencodedParser,(req,res,next)=>
{
    var addressbook=require('../models/addressbook')
    var newaddress=addressbook()
    newaddress._id=random.int(200, 624233232);
    newaddress.name=req.body.name
    newaddress.email=req.body.email
    newaddress.phone=req.body.phone
    newaddress.city=req.body.city
    newaddress.state=req.body.state
    newaddress.country=req.body.country
    newaddress.organization=req.body.organization
    newaddress.jobProfile=req.body.jobProfile
    newaddress.additionalInfo="nil"
    console.log(newaddress)
    newaddress.save((err,data)=>{
        if(err)
        {
            res.send({status:'0'})
        }
        else
        {
            res.render(appRoot+'/html/addcontact.ejs')   
        }
    })
})
module.exports=routes;