var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var order = mongoose.model('order');
var user = mongoose.model('user');

router.param('order', function(req, res, next, id) {
    req.order = id;
    next();
});

router.get('/', function(req, res, next) {
    order.find({}, '-__v').exec(function(err, orders) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
            return;
        }

        res.send(orders);
    });
});

router.get('/:order', function(req, res, next) {
    order.findOne({_id: req.order}, '-__v').exec(function(err, order) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
            return;
        }

        res.send(order);
    });
});

router.post('/', function(req, res, next) {
    var newOrder = req.body;

    user.findOne({_id: req.body.user}, '-__v').exec(function(err, user) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
            return;
        }

        if (new Date().toUTCString() > user
                .expiresAt.toUTCString()) {
            res.sendStatus(401);
            return;
        }

        newOrder.status = false;

        new order(newOrder).save(function(err, order) {
            if (err) {
                console.log(err);
                res.sendStatus(400);
                return;
            }
            res.send(order);
        });
    });
});

router.put('/:order', function(req, res, next) {
    order.findOneAndUpdate({_id: req.order}, {status: true}, '-__v').exec(function(err, order) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
            return;
        }

        res.send(order);
    });
});

module.exports = router;