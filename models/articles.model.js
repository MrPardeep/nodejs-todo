var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articlesModel = new Schema({
	'title': {type: String, required: true},
    'description': {type: String, required: false},
    'publish_date': {type: String, required: false},
    'duration': {type: String, required: false},
    'cover_image': {type: String, required: false},
    'author_id': {type: String, required: true},
    'author_image': {type: String, required: false},
    'author_name': {type: String, required: false},
    'does_follow': {type: Boolean, default: false},
    'is_bookmark': {type: Boolean, default: false},
    'is_recommended' : {type: Boolean, default: false}
})

articlesModel.pre('save', function (next) {
	var article = this;
	
	/*to calculate duration of time*/
	let totalWords = article.description.split(' ').length;
	let timeDuration = Math.floor(totalWords/275);
	article.duration = timeDuration < 1 ? 1 : timeDuration ;

	/*Setting Current date as publish date*/
	article.publish_date = new Date();

	console.log(article,"**********");
	next();
});

var ArticlesModel = mongoose.model('ArticlesModel', articlesModel)
module.exports = ArticlesModel;