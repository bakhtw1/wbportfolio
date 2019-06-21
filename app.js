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

const portNum = process.argv[2];

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

app.listen(3000);
console.log('Running app at localhost: ' + portNum);
