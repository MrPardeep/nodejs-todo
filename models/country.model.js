var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countryModel = new Schema({
	'name': {type: String, required: true},
    'code': {type: String, required: false}
})

var CountryModel = mongoose.model('CountryModel', countryModel)
module.exports = CountryModel;