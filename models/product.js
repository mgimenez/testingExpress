var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function validatePresenceOf(value) {
    return value && value.length;
}

var ProductSchema = new Schema({
    name: {
        type: String,
        validate: [validatePresenceOf, 'name is required!']
    },
    description: {
        type: String,
        validate: [validatePresenceOf, 'description is required!']
    },
    price: {
    	type: String,
    	validate: [validatePresenceOf, 'price is required!']
    },
    categoryId: {
    	type: Schema.ObjectId,
    	ref: 'categorySchema'
    }
});

module.exports = mongoose.model('product', ProductSchema);