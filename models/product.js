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
    price: {
    	type: String,
    	validate: [validatePresenceOf, 'price product is required!']
    },
    categoryId: {
    	type: Schema.ObjectId,
    	ref: 'categorySchema'
    }
});

module.exports = mongoose.model('product', ProductSchema);