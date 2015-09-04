var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function validatePresenceOf(value) {
    return value && value.length;
}

var ProductSchema = new Schema({
    name: {
        type: String,
        validate: [validatePresenceOf, 'name product is required!']
    },
    category: {
    	type: Schema.ObjectId,
    	ref: 'categories'
    }
});

module.exports = mongoose.model('product', ProductSchema);