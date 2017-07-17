const customer = require('./customer.route');


module.exports = function (app) {
  app.use('/customer', customer); 
}