const express = require('express')
const routes = express.Router()
const authUser = require("../models/authUser");
const apigen = require('uuid-apikey');
var bodyParser = require('body-parser')
var random = require('random')
const apikeyvalue= apigen.create().apiKey;
var urlencodedParser = bodyParser.urlencoded({ extended: false })

routes.get('/login',(req,res,next)=>
{
    if(!req.session.userid)
    {
   res.render(appRoot+'/html/login.ejs') 
    }
    else
    {
        res.redirect('dashboard');
    }
})

routes.post('/rest/loginrequest', urlencodedParser, function (req, res) {
    var newAuthUser = new authUser();
    newAuthUser._id = random.int(100, 324233232);
    newAuthUser.username = req.body.username;
    newAuthUser.password = req.body.password;
    newAuthUser.role = 1;
    newAuthUser.isActive = 9;
    if(req.body.username!=null)
    {
    authUser.findOne({ username: req.body.username }, (err, obj) => {
        if (obj != null) {
            //console.log("username",obj.username)
            if (obj.password == req.body.password) {
                req.session.userid=obj.id
                req.session.role=obj.role
               saveApi(obj.username)
                res.send({ status: 1, role: obj.role, isActive: obj.isActive,apikey:apikeyvalue,userid:obj.id });
            
            }
            else {
                res.send({ status: 2 })
            }
        }
        else {
            newAuthUser.save(function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    const api = saveApi(data.username);
                    req.session.userid=data.id
                    req.session.role=data.role
                    res.send({ status: 0, role: data.role, isActive: data.isActive, apikey: api,userid:data.id});
                }
            });
        }
    });
}
});

var saveApi =  async (email) => {
    const apikey = require("../models/api");
    try {
        let key = new apikey({ email: email, apikey: apikeyvalue })
        finalkey = await key.save();
      } catch (e) {
        throw new ProductCreateError();
      }
};

routes.get('/logout',(req,res)=>
{
req.session=null;
res.send({data:1})
})
module.exports = routes