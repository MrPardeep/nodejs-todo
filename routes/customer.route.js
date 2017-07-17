/**
 *@Holds code to route the user specific APIs to the right functions
*/

const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');
const loginController = require('../controllers/login.controller')
const fileUploadingController = require('../controllers/file-upload.controller')
const articlesController = require('../controllers/articles.controller');

router.post('/customer', customerController.register);
router.get('/customer', customerController.getCustomers);
router.get('/customer/:id', customerController.getCustomer);
router.delete('/customer/:id', customerController.deleteCustomer);
router.put('/customer/:id', customerController.UpdateCustomer);

router.post('/country', customerController.submitCountry);
router.get('/country', customerController.getCountries);
router.get('/country/:name', customerController.getCountry);

router.post('/login', loginController.login);
router.post('/profile', fileUploadingController.fileUploadfunction)

router.post('/articles', isAuthenticated, articlesController.saveArticle);
router.get('/articles', articlesController.getArticles);

function isAuthenticated(req, res, next) {
	// console.log('checking for authenticated', req.headers.authorization);
    if (req.headers.authorization)
        return next();

    res.redirect('/');
}


module.exports = router;