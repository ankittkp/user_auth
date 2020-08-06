const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


routes.use(bodyparser.urlencoded({ extended : true}));

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mongoDb:pogo@%!!@cluster0.x9uu0.gcp.mongodb.net/userDb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true
});


routes.get('/',(req,res) => {
    res.render('index');
});

routes.post('/register',(req,res) => {
    var { email, username , password, confirmpassword } = req.body;
    var err;
    if(!email || !username || !password || !confirmpassword){
        err = "Please fill all the fields";
        res.render('index', { 'err' : err});
    }
    if(password != confirmpassword){
        err = "Passwords dont match";
        res.render('index', { 'err' : err, 'email' : email, 'username' : username});
    }
});
module.exports = routes;