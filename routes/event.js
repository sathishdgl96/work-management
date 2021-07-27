const express=require('express')
const eventsRoutes=express.Router()

eventsRoutes.get('/event',(req,res,next)=>
{
res.write('This session will be closed in 30 seconds');
const EventEmitter = require('events');
var eventEmitter = new EventEmitter();
var fun1 = (msg) => {
	res.end( msg);
};

eventEmitter.on('myEvent', fun1);
setTimeout(() => {
    console.log('timeout');
  }, 30000);
eventEmitter.emit('myEvent', "Event occurred:")
eventEmitter.removeAllListeners('myEvent');
eventEmitter.emit('myEvent', "Event occurred");

})

module.exports=eventsRoutes