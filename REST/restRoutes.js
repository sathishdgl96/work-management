const express=require('express')
const routes=express.Router()
routes.post('/',(req,res,next)=>
{
  res.send("Sorry the content, you are looking are not found");
});
module.exports=routes