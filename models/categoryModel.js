var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var category = new Schema ({
    category_name: {type: String, required: true}
});

mongoose.model('category', category);