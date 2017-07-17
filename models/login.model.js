var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loginModel = new Schema({
    'email': {type: String, required: true},
    'password': {type: String, required: true},
    'is_admin': {type: Boolean, required: false},
})

var LoginModel = mongoose.model('LoginModel', loginModel)
module.exports = LoginModel;