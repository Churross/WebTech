var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Category = mongoose.model('category');

var item = new Schema ({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    category: { type: Schema.ObjectId, ref: 'Category' }
});

mongoose.model('item', item);