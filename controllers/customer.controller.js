var customerModel = require('../models/customer.model');
var countryModel = require('../models/country.model');
var mongoose = require('mongoose');

/*Save method to save data*/
exports.register = (req, res) => {
    if (req.body.email !== undefined) {
        if(checkEmail(req.body.email)){
            var model = new customerModel(req.body)
            model.save((err, data) => {
                res.json(200, {
                    data: data
                })
            },
            err => {
              res.json(400, {
                    message: 'something wrong here...'
                })  
            });
        }
        else{
            var errorObj = {error : "Invalid Email"}
            res.send(400, errorObj);
        }
    }
    else
        res.send(400, {'err' : "Email Not Defined"});
}

function checkEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
exports.getCustomers = (req, res) => {
    // console.log(req, res, "Get Request");
    customerModel.find({}, (err, users) => {
        console.log(users, "USERS");
        if (err)
            throw err;
        else if(users.length == 0)
            return res.json(204, [])
        else
            return res.json(200, users);
    });
}

exports.getCustomer = (req, res) => {
    customerModel.findOne({ _id: req.params.id }, (err, user) => {
        console.log(req.params.id, "Params ID");
        if (err)
            throw err;
        return res.json(200, user);
    });
}

exports.deleteCustomer = (req, res) => {
    customerModel.remove({ _id: req.params.id }, (err, user) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else if (res) {
            res.send("user deleted");
        }
    });
}

exports.UpdateCustomer = (req, res) => {
    customerModel.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        console.log(req.body , "*****************************", req.params.id)
        user.is_bookmark = req.body.is_bookmark;
        user.name = req.body.name || user.name;

        user.save((err, data) =>{
            if(err)
                res.send(err);
            else
                res.send(200, 'Updated Successfully');
        })
    });
}

/*Save method to save data*/
exports.submitCountry = (req, res) => {
    var model = new countryModel(req.body)
    model.save((err, data) => {
        res.json(200, {
            data: data
        })
    },
    err => {
      res.json(400, {
            message: 'something wrong here...'
        })  
    });
}

exports.getCountries = (req, res) => {
    // console.log(req, res, "Get Request");
    countryModel.find({}, (err, country) => {
        if (err)
            throw err;
        else if(country.length == 0)
            return res.json(204, [])
        else
            return res.json(200, country);
    });
}

// var searchName = new RegExp(regexString, 'ig');

exports.getCountry = (req, res) => {
    /*console.log(req.params.name, "Params name");*/
    var regularExpression = new RegExp(req.params.name + ".*", "i");

    countryModel.find({'name' : regularExpression}, (err, user) => {
        if (err)
            throw err;
        return res.json(200, user);
    });
}
