var mongoose = require('mongoose');
require('./models/categoryModel.js');
require('./models/itemModel.js');
require('./models/userModel.js');
require('./models/orderModel.js');

mongoose.connect('mongodb://testrest:restaurant@ds043605.mongolab.com:43605/2id60-a3');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
});