var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function validatePresenceOf(value) {
    return value && value.length;
}

var categorySchema = new Schema({
	name: {
        type: String,
        validate: [validatePresenceOf, 'name category is required!']
    }
})

module.exports = mongoose.model('category', categorySchema);