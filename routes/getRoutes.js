const express=require('express')

const routes=express.Router()

routes.get('/',(req,res,next)=>
{
    res.sendFile(path.join(appRoot, 'html/index.html'));
})

routes.get('/signin',(req,res,next)=>
{
    res.sendFile(path.join(appRoot, 'html/signup.html'));
})


routes.get('/dashboard',(req,res,next)=>
{
    res.render(appRoot+'/html/dashboard.ejs',{'username':'sathish'})
   /* res.render(appRoot+'/html/dashboard.ejs',{'username':'sathish'}, function (err, html1) 
    {
        res.render(appRoot+'/html/index.ejs', function (err, html2) {
          res.send(html1+html2)
        })
      })
    */
})

module.exports=routes;