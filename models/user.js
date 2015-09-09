var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function validatePresenceOf(value) {
    return value && value.length;
}

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        validate: [validatePresenceOf, 'username is required!']
    },
    email: {
        type: String,
        validate: [validatePresenceOf, 'email is required!']
    },
    salt: String,
    hash: {
    	type: String,
    	validate: [validatePresenceOf, 'hash is required!']
    }
});

module.exports = mongoose.model('user', UserSchema);