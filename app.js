var express = require('express');
var nodemailer = require('nodemailer');
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.1';

var app = express();
var transporter1= nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'earnpocketmoney01@gmail.com',
    pass: 'aakash30'
  }
});

var transporter2= nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ntep.join@gmail.com',
    pass: 'aakash30'
  }
});

var fs=require("fs");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post("/send",function(req,res)
{
console.log(req.body.email);
var mailOptions = {
  from: req.body.email,
  to: 'shuklaaakash78@gmail.com,tripathianshuman9@gmail.com,earnpocketmoney01@gmail.com',
  subject: 'Message received by',
  text: req.body.name+"\n"+req.body.email+"\n"+req.body.Message
};
transporter1.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
   //res.send(""+index.html);
  }
});

});

app.post("/join",function(req,res)
{
console.log(req.body);
var mailOptions = {
  from: req.body.email,
  to: 'shuklaaakash78@gmail.com,tripathianshuman9@gmail.com,ntep.join@gmail.com',
  subject: 'Message received by',
  text: req.body.name+"\n"+req.body.email+"\n"+req.body.Phone+"\n"+req.body.Parent+"\n"+req.body.ID+"\n"+req.body.Payment
};
transporter2.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
   //res.send(""+index.html);
  }
});

});

app.get("/procedure",function(req,res)
{
var readstream=fs.createReadStream(__dirname+"/procedure.html","utf8");
readstream.pipe(res);
});

app.get("/about",function(req,res)
{
console.log("about");
var readstream=fs.createReadStream(__dirname+"/about.html","utf8");
readstream.pipe(res);
});

app.get("/",function(req,res)
{
console.log(__dirname);
var readstream=fs.createReadStream(__dirname+"/index.html","utf8");
readstream.pipe(res);
});

app.get("/contact",function(req,res)
{
var readstream=fs.createReadStream(__dirname+"/contact.html","utf8");
readstream.pipe(res);
});
app.get("/joinus",function(req,res)
{
var readstream=fs.createReadStream(__dirname+"/joinus.html","utf8");
readstream.pipe(res);
});
app.listen(server_port, server_ip_address, function () 
{

    console.log( "Listening on " + server_ip_address + ", server_port " + server_port  );
});
app.use(express.static(__dirname + '/public'));
