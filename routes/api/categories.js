var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var category = mongoose.model('category');
var item = mongoose.model('item');

router.param('category', function(req, res, next, id) {
    category.findOne({category_name: id.toLowerCase()}).exec(function (err, category) {
        if (err) {
            res.sendStatus(400);
            return;
        }
        req.category = category;
        next();
    });
});

router.get('/', function(req, res, next) {
    category.find({}, '-_id -__v').exec(function(err, category) {
        if (err) {
            res.sendStatus(400);
            return;
        }
        res.send(category);
    })
});

router.get('/:category', function(req, res, next) {
    item.findOne({category: req.category._id}, '-_id -__v').exec(function (err, item) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        }
        res.send(item);
    });
});

router.post('/', function(req, res, next) {
    if (!req.body) {
        res.sendStatus(400);
        return;
    }
    var newCategory = req.body;
    if (!newCategory.category_name) {
        res.sendStatus(400);
        return;
    }
    newCategory.category_name = newCategory.category_name.toLowerCase();

    category.findOne({category_name: newCategory.category_name}, function (err, categoryObject) {
        if (err) {
            res.sendStatus(400);
            return;
        }
        if (categoryObject) {
            res.send(categoryObject);
            return;
        }

        new category(newCategory).save(function(err, category) {
            if (!category) {
                console.log(err);
                res.sendStatus(400);
                return;
            }
            res.send(category);
        });
    });
});

router.delete('/:category', function(req, res, next) {
    category.find({ name: req.category.category_name }).remove().exec(res.end());
});

module.exports = router;