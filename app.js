const express=require('express')
var path = require('path');
global.appRoot = path.resolve(__dirname);
const routes = require('./routes/getRoutes');
const events=require('./routes/event');
const restroutes=require('./REST/restRoutes');
const photoroutes=require('./REST/photo');
const jobpoolroutes=require('./REST/jobpool');
const mongo=require('./mongoConfig')
const authuser=require('./REST/authuser')
const teams=require('./REST/team')
const tasks=require('./REST/task')
const fileUpload = require('express-fileupload');
const app=express()
app.use(fileUpload());
mongo();
const profileRoutes=require("./REST/profile")
var cookieSession = require('cookie-session')
app.use(cookieSession({
  name: 'session',
  keys: ["sathish"],
  maxAge: 48 * 60 * 60 * 1000 // 48 hours
}))
app.use(express.json())
app.use(express.static('./public'))
app.use(routes)
app.use(restroutes)
app.use(events)
app.use(authuser)
app.use(jobpoolroutes)
app.use(profileRoutes)
app.use(photoroutes)
app.use(teams)
app.use(tasks)
app.listen(8000, console.log("app is listening"))