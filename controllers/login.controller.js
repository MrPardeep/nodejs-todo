var customerModel = require('../models/customer.model');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken')
var config = require('../config');

function checkEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
/*Save method to save data*/
exports.login = (req, res) => {
    if (req.body.email !== undefined) {
        if(checkEmail(req.body.email)){
            customerModel.find({email : req.body.email},function(err,data){
                console.log(err, data);

                var token = jwt.sign(data[0], config.secret, {
                  expiresIn : '1440m'
                });

                if(err)
                    res.json(err);
                else{
                    if(req.body.facebook_auth && data.length){
                        data[0].facebook_auth = true;
                        customerModel.update({_id:data[0]._id},{facebook_auth: req.body.facebook_auth}, function(err, resp){
                            res.json(200, {msg:"User Varified successfully via facebook.", data: data[0], token: token});
                        });
                    }
                    else if(req.body.google_auth && data.length){
                        data[0].google_auth = true;
                        customerModel.update({_id:data[0]._id},{google_auth: req.body.google_auth}, function(err, resp){
                            res.json(200, {msg:"User Varified successfully via google_auth.", data: data[0], token: token});
                        });
                    }
                    else if(data.length){
                            if(data[0].password !== null){
                                bcrypt.compare(req.body.password, data[0].password, function(err, response) {
                                    if(response === true){
                                       res.json(200, {msg:"User Varified successfully.",data:data[0], token: token});
                                    }
                                    else{
                                       res.json(400, {msg:"Password Mismatch",data:data[0]});
                                    }
                                });
                            }
                            else{
                                console.log(req.body.password, "password in ctrl");
                                bcrypt.genSalt(5, function(err, salt) {
                                    bcrypt.hash(req.body.password, salt, null,function(err, hash) {
                                           customerModel.update({_id:data[0]._id},{password: hash}, function(err, resp){
                                                res.json(200, {msg:"password set successfully and now can login", data: data[0], token: token});
                                            });
                                    });
                                });
                            }
                    }
                    else
                        res.json(400, {msg:"User Name does not exists."});
                }
            })
        }
        else
            res.send(400, "Invalid Email");
    }
    else
        res.send(400, {'err' : "Email Not Defined"});
}