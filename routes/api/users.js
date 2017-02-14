var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var user = mongoose.model('user');

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
}

router.param('user', function(req, res, next, id) {
    req.user = id;
    next();
});

router.get('/', function(req, res, next) {
    user.find({}, '-__v').exec(function(err, users) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
            return;
        }

        res.send(users);
    });
});

router.get('/:user', function(req, res, next) {
    user.findOne({_id: req.user}, '-__v').exec(function(err, user) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
            return;
        }

        res.send(user);
    });
});

router.post('/', function(req, res, next) {
    var newUser = req.body;

    newUser.expiresAt = new Date().addHours(newUser.duration);

    new user(newUser).save(function(err, user) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
            return;
        }

        res.send(user);
    });
});

module.exports = router;