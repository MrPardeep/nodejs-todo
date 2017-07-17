var customerModel = require('../models/customer.model');
var mongoose = require('mongoose');
var multer  = require('multer');
var upload = multer({dest: './uploads/'}).single('file');

exports.fileUploadfunction = (req, res) => {
	upload(req, res, function(err){
		console.log(req.body);
		if(err){
			console.log(err);
			return res.status(400).send("An Error occured")
		}
		path = req.file.path;
		return res.status(200).send("Upload Completed for " + path);
	})
}