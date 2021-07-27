const express=require('express')
const bodyParser=require('body-parser')
var path = require('path');
global.appRoot = path.resolve(__dirname);
const routes = require('./routes/getRoutes');
const events=require('./routes/event');

const app=express()
app.use(express.static('./public'))
app.use(routes)
app.use(events)
app.listen(8000, console.log("app is listening"))