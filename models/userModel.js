var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema ({
    table: {type: Number, required: true},
    createdAt: {type: Date, default: function(){return new Date()}},
    expiresAt: {type: Date, required: true, required: true}
});

mongoose.model('user', user);