const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs');
const user = require('../model/models');
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
    if(typeof err == 'undefined'){
        user.findOne({ email : email }, function(err, data){
            if(err) throw err;
            if(data){
                console.log("user exists");
                err = "User Already Exists With This Email ...";
                res.render('index', { 'err' : err, 'email' : email, 'username' : username});
            }
            else{
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        password = hash;
                        user({
                            email,
                            username,
                            password, 
                        }).save((err, data) => {
                            if (err) throw err;
                            res.redirect('/login');
                        });
                    });
                });
            }
        });
    } 
)};
module.exports = routes;