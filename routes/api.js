var express = require('express');
var router = express.Router();

var orders = require('./api/orders');
var items = require('./api/items');
var users = require('./api/users');

router.use("/orders", orders);
router.use("/items", items);
router.use("/users", users);

module.exports = router;