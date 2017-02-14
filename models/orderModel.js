var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Item = mongoose.model('item');
var User = mongoose.model('user');

var order = new Schema ({
    status: Boolean,
    user: { type: Schema.ObjectId, ref: 'User' },
    items: {type :
        [{
        id: { type: Schema.ObjectId, ref: 'Item' },
        amount: Number,
        _id:false
        }],
        required: true}

});

mongoose.model('order', order);