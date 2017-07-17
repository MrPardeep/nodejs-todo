var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var customerModel = new Schema({
    'username': { type: String, required: false },
    'lastName': { type: String, required: false },
    'email': { type: String, required: true },
    'mobile': { type: Number, required: false },
    'dob': { type: String, required: false },
    'password': { type: String, required: false },
    'is_bookmark': {type: Boolean, required: false, default: false},
    'facebook_auth' : {type: Boolean, default: false},
    'google_auth' : {type: Boolean, default: false},
    'image': {type: String, default: null}
})


customerModel.pre('save', function (next) {
	var user = this;
    const saltRounds = 5;
    bcrypt.genSalt(saltRounds, function(err, salt) {
	    bcrypt.hash(user.password, salt, null,function(err, hash) {
            if(user.password !== null)
	           user.password = hash;
            else
                user.password = null;
	        next();
	    });
	});
});

customerModel.pre('update', function (next) {
    var user1 = this;
    const saltRounds = 5;
    console.log(user1.password,'***********')
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash('password', salt, null,function(err, hash) {
            if(user1.password == null)
               user1.password = hash;
            console.log(hash,'$$$$$$$$$$$$$$$$$$$$')
            next();
        });
    });
});

var user = mongoose.model("customerModel",customerModel);
module.exports = user;