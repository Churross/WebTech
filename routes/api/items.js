var express = require('express');
var router = express.Router();
var async = require('async');

var categories = require('./categories');

var mongoose = require('mongoose');
var item = mongoose.model('item');
var category = mongoose.model('category');

router.use("/categories", categories);

router.param('item', function(req, res, next, id) {
    req.item = id;
    next();
});

router.get('/', function(req, res, next) {
    item.find({}, '-__v').lean().exec(function(err, items) {
        if (err) {
            res.sendStatus(400);
            return;
        }

        async.map(items, function (key, next) {
            category.findOne({ _id: key.category }, function (err, result) {
                next(err, result.category_name);
            });
        },
        function (err, result) {
            result.forEach(function (element, index) {
                items[index].category = element;
            });
            res.send(items);
        });
    })
});

router.get('/:item', function(req, res, next) {
    item.findOne({_id: req.item}, '-__v').lean().exec(function (err, item) {
        if (err) {
            res.sendStatus(400);
            return;
        }
        category.findOne({_id: item.category}, '-__v').exec(function (err, category) {
            item.category = category.category_name;
            res.send(item);
        });
    });
});

router.post('/', function(req, res, next) {
    var newItem = req.body;

    if(!req.body.category) {
        res.sendStatus(400);
        return;
    }

    category.findOne({category_name: req.body.category.toLowerCase()}).exec(function (err, category) {
        if (err) {
            res.sendStatus(400);
            return;
        }

        newItem.category = category._id;

        new item(newItem).save(function(err, item) {
            if (err) {
                console.log(err);
                res.sendStatus(400);
                return;
            }
            res.send(item);
        });
    });
});

router.put('/:item', function(req, res, next) {
    item.findOne({_id: req.item}, function (err, item){
        if (err) {
            res.sendStatus(400);
            return;
        }
        item.name = req.body.name;
        item.price = req.body.price;
        item.save();
        res.send(item);
    });
});

router.delete('/:item', function(req, res, next) {
    item.find({ _id: req.item }).remove().exec(res.end());
});

module.exports = router;