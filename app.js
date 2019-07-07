'use strict'

// C library API
const ffi = require('ffi');

// Express App (Routes)
//HELLO
const express = require("express");
const app     = express();
const path    = require("path");
const fileUpload = require('express-fileupload');
const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');
var bodyParser = require('body-parser');

const portNum = process.argv[2];

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'messagewaqasbakht1@gmail.com',
    pass: 'Omran3akht1'
  }
});

//decode post requests
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Send HTML at root
app.get('/', function(req,res){ 
    res.sendFile(path.join(__dirname+'/public/index.html'));
});  
  
// Send Style
app.get('/style.css', function(req,res){
    res.sendFile(path.join(__dirname+'/public/style.css'));
});
  
// Send obfuscated JS, do not change
app.get('/index.js', function(req,res){
    fs.readFile(path.join(__dirname+'/public/index.js'), 'utf8', function(err, contents) {
        const minimizedContents = JavaScriptObfuscator.obfuscate(contents, {compact: true, controlFlowFlattening: true});
        res.contentType('application/javascript'); 
        res.send(minimizedContents._obfuscatedCode);
    });
});
 
app.get('/background.jpg', function(req, res){
    res.sendFile(path.join(__dirname+'/public/images/A_Special_Place.jpg'));
});

app.get('/thumbnail.jpeg', function(req, res){
    res.sendFile(path.join(__dirname+'/public/images/pro-file-pic.jpg'));
});
 
app.get('/landing-image.jpg', function(req, res){
    res.sendFile(path.join(__dirname+'/public/images/landing-image.jpg'));
});

app.get('/calApp.png', function(req, res){
    res.sendFile(path.join(__dirname+'/public/images/calendarApp.png'));
});

app.post('/sendMessage', function(req, res){
    console.log(req.body);
    
    var mailOptions = {
        from: 'messagewaqasbakht1@gmail.com',
        to: 'bakhtw1@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
});


app.listen(3000);
console.log('Running app at localhost: ' + portNum);
