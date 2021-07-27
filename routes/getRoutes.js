const express=require('express')
const routes=express.Router()
const path=require('path')
const ejs=require('ejs')
var fs = require('fs');
var templateString = null;

routes.get('/',(req,res,next)=>
{
  res.render(appRoot+'/html/index.ejs',{'username':'sathish'}) 
})

routes.get('/signin',(req,res,next)=>
{
   res.render(appRoot+'/html/signup.ejs',{'username':'sathish'}) 
})


routes.get('/dashboard',(req,res,next)=>
{
    res.render(appRoot+'/html/dashboard.ejs',{'username':'sathish'})   
})

module.exports=routes;